import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class Index extends React.Component{

    state = {
        getResponse : undefined,
    }

    componentDidMount(){

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : 'Bearer ' + localStorage.getItem('USER_TOKEN')
        }

        axios.get(
            process.env.REACT_APP_LINK_API+'/schedules', {
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

    render(){
        return(
            <Card title="Horários">
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
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Próximos horários</th>
                            <th scope="col">Pessoa</th>
                            <th scope="col">Medicamento</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            (this.state.getResponse !== undefined && this.state.getResponse.data &&
                                this.state.getResponse.data.map((schedule) => {
                                    return (
                                        <tr key={schedule.id}>
                                            <td>{schedule.schedule}</td>
                                            <td>{schedule.person_name}</td>
                                            <td>{schedule.drug_name}</td>
                                            
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