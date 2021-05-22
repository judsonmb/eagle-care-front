import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class Index extends React.Component{

    state = {
        getResponse : undefined,
        removeResponse : undefined
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
            this.setState({ getResponse : res.data })
        })
        .catch(err => {
            if(err.response){
                this.setState({ getResponse : err.response.data })
            }
        })
    }

    goToUpdatePage(id){
        localStorage.setItem('SELECTED', id)
        window.location.href = "/pessoas/editar"
    }

    removeUser = async (id) => {
        
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }
    
        let response = {
            success: false,
            message: ''
        }

        await axios.delete(
            process.env.REACT_APP_LINK_API+'/people/'+id, {
                headers: headers
            })
            .then(res => {
                response.success = true
                response.message = res.data.message
                this.componentDidMount()
            })
            .catch(err => {
                response.message = err.data.message
            })
            this.setState({ removeResponse : response })
    }

    render(){
        return(
            <Card title="Pessoas">
                {
                    this.state.getResponse === undefined && <div className="spinner-border"></div>
                }
                {   
                    (this.state.removeResponse !== undefined && this.state.removeResponse.message && !this.state.removeResponse.success) &&
                        <div className="alert alert-dismissible alert-danger">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>{this.state.removeResponse.message}</strong>
                        </div>
                }
                {   
                    (this.state.removeResponse !== undefined && this.state.removeResponse.message && this.state.removeResponse.success) &&
                        <div className="alert alert-dismissible alert-success">
                            <button type="button" className="close" data-dismiss="alert">&times;</button>
                                <strong>{this.state.removeResponse.message}</strong>
                        </div>
                }
                <a href="/pessoas/cadastrar/"><button type="button" className="btn btn-success">Cadastrar</button></a>
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            (this.state.getResponse !== undefined && this.state.getResponse.data &&
                                this.state.getResponse.data.map((person) => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.name}</td>
                                            <td>
                                                <button type="button" onClick={() => this.goToUpdatePage(person.id)} className="btn btn-warning disabled">Editar</button>
                                                <button type="button" onClick={() => this.removeUser(person.id)} className="btn btn-danger">Excluir</button>
                                            </td>
                                        </tr>
                                        )
                                })
                            ) 
                        }
                    </tbody>
                </table>
            </Card>
        )
    }
}

export default Index