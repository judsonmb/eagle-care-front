import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class UpdateDrug extends React.Component{

    state = {
        id: undefined,
        name : '',
        dosage: '',
        price: '',
        schedule_id: '',
        person_id: '',
        period: '',
        people: '',
        schedules: '',
        apiResponse: undefined,
        errorMessage: undefined,
    }

    componentDidMount(){

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
          }

        axios.get(
            process.env.REACT_APP_LINK_API+'/drugs/'+localStorage.getItem('SELECTED')+`/edit`, {
                headers: headers
        })
        .then(res => {
            this.setState({ apiResponse : res.data.data })
            this.setState({ name: res.data.data.name})
            this.setState({ dosage: res.data.data.dosage})
            this.setState({ price: res.data.data.price})
            this.setState({ schedule_id: res.data.data.schedule_id})
            this.setState({ person_id: res.data.data.person_id})
            this.setState({ period: res.data.data.period})
        })
        .catch(err => {
            if(err.this.state.apiUpdateResponse){
                this.setState({ apiResponse : err.this.state.apiUpdateResponse.data })
            }
        })

        
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

        axios.get(
            process.env.REACT_APP_LINK_API+'/schedules', {
                headers: headers
        })
        .then(res => {
            this.setState({ schedules : res.data.data })
        })
        .catch(err => {
            if(err.response){
                this.setState({ apiResponse : err.response.data })
            }
        })
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }

    UpdateDrug = async (event) => {

        event.preventDefault();

        const form = {
            name : this.state.name,
            dosage: this.state.dosage,
            price: this.state.price,
            schedule_id: this.state.schedule_id,
            person_id: this.state.person_id,
            period: this.state.period,
        }
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }

        console.log(form);

        await axios.put(
            process.env.REACT_APP_LINK_API+'/drugs/'+localStorage.getItem('SELECTED'), form, {
                headers: headers
            })
            .then(res => {
                window.location.href = "/medicamentos"
            })
            .catch(err => {
                let message = ''
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.name){
                            message += err.response.data.message.name[0] + ' '
                        }
                        if(err.response.data.message.dosage){
                            message += err.response.data.message.dosage[0] + ' '
                        }
                        if(err.response.data.message.price){
                            message += err.response.data.message.price[0] + ' '
                        }
                        if(err.response.data.message.schedule_id){
                            message += err.response.data.message.schedule_id[0] + ' '
                        }
                        if(err.response.data.message.person_id){
                            message += err.response.data.message.person_id[0] + ' '
                        }
                        if(err.response.data.message.period){
                            message += err.response.data.message.period[0] + ' '
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
            schedule: ''
        })
    }

    render(){
        return(
            <Card title="Edição de Medicamento">
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
                    <form id="UpdateDrugForm" onSubmit={this.UpdateDrug}>
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
                                <label>Preço</label>
                                <input type="number" step="0.01" name="price" className="form-control" value={this.state.price} onChange={this.onChange}></input> 
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Período (em dias)*</label>
                                <input type="number" name="period" className="form-control" value={this.state.period} onChange={this.onChange} required></input> 
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Horário*</label>
                                <select name="schedule_id" className="form-control" value={this.state.schedule_id} onChange={this.onChange} required>
                                    <option value="">selecione...</option>
                                    {   
                                        (this.state.schedules !== '' &&
                                            this.state.schedules.map((schedule) => {
                                                return (
                                                    <option key={schedule.id} value={schedule.id}>{schedule.schedule}</option>
                                                )
                                            })
                                        ) 
                                    }
                                </select>
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
                                                    <option  key={person.id} value={person.id}>{person.name}</option>
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

export default UpdateDrug