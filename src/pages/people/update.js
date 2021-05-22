import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class UpdatePerson extends React.Component{

    state = {
        id: undefined,
        name : '',
        errorMessage: undefined,
    }

    componentDidMount(){

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
          }

        axios.get(
            process.env.REACT_APP_LINK_API+'/people/'+localStorage.getItem('SELECTED')+`/edit`, {
                headers: headers
        })
        .then(res => {
            this.setState({ apiResponse : res.data.data })
            this.setState({ name: res.data.data.name})

        })
        .catch(err => {
            if(err.this.state.apiUpdateResponse){
                this.setState({ apiResponse : err.this.state.apiUpdateResponse.data })
            }
        })
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    UpdatePerson = async (event) => {

        event.preventDefault();

        const form = {
            name: this.state.name,
        }
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }

        await axios.put(
            process.env.REACT_APP_LINK_API+'/people/'+localStorage.getItem('SELECTED'), form, {
                headers: headers
            })
            .then(res => {
                window.location.href = "/pessoas"
            })
            .catch(err => {
                let message = ''
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.name){
                            message += err.response.data.message.name[0] + ' '
                        }
                    }else if(err.response.status === 500){
                        message = err.response.data.message
                    }
                }
                this.setState({ errorMessage : message })
            })
    }

    clearFields = () => {
        this.setState({ 
            name: ''
        })
    }

    render(){
        return(
            <Card title="Edição de Usuário">
                { 
                    this.state.apiResponse === undefined && <div className="spinner-border"></div> 
                }
                {
                    this.state.errorMessage !== undefined &&
                    <div className="alert alert-dismissible alert-danger">
                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                        <strong>{this.state.errorMessage}</strong>
                    </div>
                }
                { 
                    this.state.apiResponse !== undefined &&
                    <form id="UpdatePersonForm" onSubmit={this.UpdatePerson}>
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
                }
            </Card>
        )
    }
}

export default UpdatePerson