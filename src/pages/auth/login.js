import React from "react";
import axios from 'axios';
import Card from '../../components/defaultCard';


class Login extends React.Component{

    state = {
        email: '',
        password: '',
        apiResponse: undefined
    }

    onChange = (event) => {
        const value = event.target.value
        const fieldName = event.target.name
        this.setState({ [fieldName]: value })
    }
    
    executeLogin = async (event) => {

        event.preventDefault();

        let apiResponse = '';
        
        const credentials = {
            email: this.state.email,
            password: this.state.password
        } 

        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    
        await axios.post(process.env.REACT_APP_LINK_API+'/login', credentials, {
                headers: headers
            })
            .then(res => {
                localStorage.setItem('USER_TOKEN', res.data.data.token)
                localStorage.setItem('USER_ID', res.data.data.id)
                localStorage.setItem('USER_NAME', res.data.data.name)
                apiResponse = res.data.status
                window.location.pathname = "/home"
                window.location.href = "/home"
            })
            .catch(err => {
                console.log(err)
                if(err.response){
                    if(err.response.status === 422){
                        if(err.response.data.message.email){
                            apiResponse += err.response.data.message.email[0] + ' '
                        }
                        if(err.response.data.message.password){
                            apiResponse += err.response.data.message.password[0] + ' '
                        }
                    }else{
                        apiResponse = err.response.data.message
                    }
                }else{
                    apiResponse = 'Sistema fora do ar. Por favor, contate o suporte.'
                }
            })

        this.setState({ apiResponse })
    }
    
    render(){
        return (
            <div className="jumbotron">
                <h1 className="display-4">Seja Bem vindo ao Eagle Care!</h1>
                <p className="lead">O Eagle Care é um software de controle de medicamentos.</p>
                <hr className="my-4"/>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <Card title="Login">
                                {
                                    this.state.apiResponse !== undefined && this.state.apiResponse !== 200 &&
                                    <div className="alert alert-dismissible alert-danger">
                                        <button type="button" className="close" data-dismiss="alert">&times;</button>
                                        <strong>{this.state.apiResponse}</strong>
                                    </div>
                                }
                                <form id="formLogin" onSubmit={this.executeLogin}>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>E-mail*</label>
                                                <input type="text" name="email" className="form-control" value={this.state.email} onChange={this.onChange} required></input> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="form-group">
                                                <label>Senha*</label>
                                                <input type="password" name="password" className="form-control" value={this.state.password} onChange={this.onChange} required></input> 
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-md-1">
                                            <button type="submit" className="btn btn-success">Logar</button>
                                        </div>
                                    </div>
                                </form>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login