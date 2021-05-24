import React from 'react';
import axios from 'axios';
import Card from '../../components/defaultCard';


class CreateDrug extends React.Component{

    state = {
        name : '',
        dosage: '',
        price: '',
        interval: '',
        person_id: '',
        period: '',
        people: '',
        apiResponse: undefined
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    componentDidMount(){

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }

        axios.get(
            process.env.REACT_APP_LINK_API+'/people', {
                headers: headers
        })
        .then(res => {
            this.setState({ people : res.data.data })
        })
        .catch(err => {
            if(err.response){
                this.setState({ apiResponse : err.response.data })
            }
        })
    }

    CreateDrug = async (event) => {

        document.getElementById("save-button").innerHTML = 'Aguarde...';
        document.getElementById("save-button").prop("disabled", true);

        event.preventDefault();

        const form = {
            name : this.state.name,
            dosage: this.state.dosage,
            price: this.state.price,
            interval: this.state.interval,
            person_id: this.state.person_id,
            period: this.state.period,
        } 

        let config = {
            headers: { Authorization: 'Bearer ' + localStorage.getItem('USER_TOKEN') }
        }
    
        let response = {
            success: false,
            message: ''
        }
        
        await axios.post(
            process.env.REACT_APP_LINK_API+'/drugs', 
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
                        if(err.response.data.message.dosage){
                            response.message += err.response.data.message.dosage[0] + ' '
                        }
                        if(err.response.data.message.price){
                            response.message += err.response.data.message.price[0] + ' '
                        }
                        if(err.response.data.message.interval){
                            response.message += err.response.data.message.interval[0] + ' '
                        }
                        if(err.response.data.message.person_id){
                            response.message += err.response.data.message.person_id[0] + ' '
                        }
                        if(err.response.data.message.period){
                            response.message += err.response.data.message.period[0] + ' '
                        }
                    }else if(err.response.status === 500){
                        response.message = err.response.data.message
                    }
                }
            })

        document.getElementById("save-button").innerHTML = 'Salvar';
        document.getElementById("save-button").prop("disabled", false);
    
        this.setState({ apiResponse: response })
    }

    clearFields = () => {
        this.setState({ 
            name : '',
            dosage: '',
            price: '',
            interval: '',
            person_id: '',
            period: '',
        })
    }

    render(){
        return(
            <Card title='Cadastro de Medicamento'>
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
                <form id="CreateDrugForm" onSubmit={this.CreateDrug}>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Nome*</label>
                                <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Dosagem (em mg)*</label>
                                <input type="number" name="dosage" className="form-control" value={this.state.dosage} onChange={this.onChange} min="10" max="100" required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Preço (total de unidades para o período todo)</label>
                                <input type="number" step="0.01" name="price" className="form-control" value={this.state.price} onChange={this.onChange}></input> 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Período (por quantos dias vai tomar)*</label>
                                <input type="number" name="period" className="form-control" value={this.state.period} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Intervalo (de quantas em quantas horas)*</label>
                                <input type="number" name="interval" className="form-control" value={this.state.interval} onChange={this.onChange} required></input>
                            </div>
                        </div>       
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Pessoa*</label>
                                <select name="person_id" className="form-control" value={this.state.person_id} onChange={this.onChange} required>
                                    <option value="">selecione...</option>
                                    {   
                                        (this.state.people !== '' &&
                                            this.state.people.map((person) => {
                                                return (
                                                    <option key={person.id} value={person.id}>{person.name}</option>
                                                )
                                            })
                                        ) 
                                    }
                                </select>                            
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-1">
                            <button id="save-button" type="submit" className="btn btn-success">Salvar</button>
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

export default CreateDrug