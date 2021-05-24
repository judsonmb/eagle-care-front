import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class WhoMoreExpend extends React.Component{

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
            process.env.REACT_APP_LINK_API+'/who-more-expend', {
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
            <Card title="Quem mais gasta com medicamento">
                {
                    this.state.getResponse === undefined && <div className="spinner-border"></div>
                }
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Nome</th>
                            <th scope="col">Valor</th>
                        </tr>
                    </thead>
                    <tbody>
                        {   
                            (this.state.getResponse !== undefined && this.state.getResponse.data &&
                                this.state.getResponse.data.map((person) => {
                                    return (
                                        <tr key={person.id}>
                                            <td>{person.name}</td>
                                            <td>R$ {person.value}</td>
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

export default WhoMoreExpend