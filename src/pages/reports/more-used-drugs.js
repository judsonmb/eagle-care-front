import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class MoreUsedDrugs extends React.Component{

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
            process.env.REACT_APP_LINK_API+'/more-used-drugs', {
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
            <Card title="Medicamentos mais usados">
                {
                    this.state.getResponse === undefined && <div className="spinner-border"></div>
                }
                <div class="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Nome</th>
                                <th scope="col">Quantidade</th>
                            </tr>
                        </thead>
                        <tbody>
                            {   
                                (this.state.getResponse !== undefined && this.state.getResponse.data &&
                                    this.state.getResponse.data.map((drug) => {
                                        return (
                                            <tr key={drug.name}>
                                                <td>{drug.name}</td>
                                                <td>{drug.amount}</td>
                                            </tr>
                                            )
                                    })
                                ) 
                            }
                        </tbody>
                    </table>
                </div>
            </Card>
        )
    }
}

export default MoreUsedDrugs