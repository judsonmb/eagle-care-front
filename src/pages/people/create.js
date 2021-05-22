import React from 'react';
import axios from 'axios';
import Card from '../../components/defaultCard';


class CreatePerson extends React.Component{

    state = {
        name : '',
        apiResponse: undefined
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    CreatePerson = async (event) => {

        event.preventDefault();

        const form = {
            name: this.state.name,
        } 

        let config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
        }
    
        let response = {
            success: false,
            message: ''
        }
        
        await axios.post(
            process.env.REACT_APP_LINK_API+'/people', 
                form,
                config
            )
            .then(res => {
                response.success = true;
                response.message = res.data.message;
            })
            .catch(err => {
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.name){
                            response.message += err.response.data.message.name[0] + ' '
                        }
                    }else if(err.response.status === 500){
                        response.message = err.response.data.message
                    }
                }
            })
        
        this.setState({ apiResponse: response })
    }

    clearFields = () => {
        this.setState({ 
            name: '',
        })
    }

    render(){
        return(
            <Card title='Cadastro de Pessoa'>
                {
                    this.state.apiResponse !== undefined && !this.state.apiResponse.success &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>{this.state.apiResponse.message}</strong>
                    </div>
                }
                {
                    this.state.apiResponse !== undefined && this.state.apiResponse.success &&
                    <div className="alert alert-dismissible alert-success">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>{this.state.apiResponse.message}</strong>
                    </div>
                }
                <form id="CreatePersonForm" onSubmit={this.CreatePerson}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group">
                                <label>Nome*</label>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button type="submit" className="btn btn-success">Salvar</button>
                        </div>
                        <div className="col-md-1">
                            <button className="btn btn-warning" onClick={this.clearFields}>Limpar</button> 
                        </div>
                    </div>
                </form>
            </Card>
        )
    }

}

export default CreatePerson