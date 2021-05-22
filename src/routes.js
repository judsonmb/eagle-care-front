import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/auth/login'
import Logoff from './logic/auth/logoff'
import Home from './pages/home'
import People from './pages/people/'
import CreatePerson from './pages/people/create'
import UpdatePerson from './pages/people/update'
import Schedules from './pages/schedules/'
import CreateSchedule from './pages/schedules/create'
import UpdateSchedule from './pages/schedules/update'

const routes = () =>  {
    return (
        <Router>
            <Switch>
                <Route exact path="/">
                    {localStorage.getItem('USER_TOKEN') ? <Redirect to="/home" /> : <Login />}
                </Route>

                <Route exact path="/logoff" component={Logoff} />

                <Route exact path="/home">
                    {localStorage.getItem('USER_TOKEN') ? <Home /> : <Login />}
                </Route>

                <Route exact path="/pessoas">
                    {localStorage.getItem('USER_TOKEN') ? <People /> : <Login />}
                </Route>

                <Route exact path="/pessoas/cadastrar">
                    {localStorage.getItem('USER_TOKEN') ? <CreatePerson /> : <Login />}
                </Route>

                <Route exact path="/pessoas/editar">
                    {localStorage.getItem('USER_TOKEN') ? <UpdatePerson /> : <Login />}
                </Route>

                <Route exact path="/horarios">
                    {localStorage.getItem('USER_TOKEN') ? <Schedules /> : <Login />}
                </Route>

                <Route exact path="/horarios/cadastrar">
                    {localStorage.getItem('USER_TOKEN') ? <CreateSchedule /> : <Login />}
                </Route>

                <Route exact path="/horarios/editar">
                    {localStorage.getItem('USER_TOKEN') ? <UpdateSchedule /> : <Login />}
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;