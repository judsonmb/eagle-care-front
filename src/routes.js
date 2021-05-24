import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom'

import Login from './pages/auth/login'
import Logoff from './logic/auth/logoff'
import Home from './pages/home'
import People from './pages/people/'
import CreatePerson from './pages/people/create'
import UpdatePerson from './pages/people/update'
import Drugs from './pages/drugs/'
import CreateDrug from './pages/drugs/create'
import Schedule from './pages/schedules/'
import WhoMoreExpend from './pages/reports/who-more-expend'
import MoreUsedDrugs from './pages/reports/more-used-drugs'
import PeopleUseSameDrugs from './pages/reports/people-use-same-drugs'


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

                <Route exact path="/medicamentos">
                    {localStorage.getItem('USER_TOKEN') ? <Drugs /> : <Login />}
                </Route>

                <Route exact path="/medicamentos/cadastrar">
                    {localStorage.getItem('USER_TOKEN') ? <CreateDrug /> : <Login />}
                </Route>

                <Route exact path="/horarios">
                    {localStorage.getItem('USER_TOKEN') ? <Schedule /> : <Login />}
                </Route>

                <Route exact path="/quem-mais-gasta">
                    {localStorage.getItem('USER_TOKEN') ? <WhoMoreExpend /> : <Login />}
                </Route>

                <Route exact path="/medicamentos-mais-usados">
                    {localStorage.getItem('USER_TOKEN') ? <MoreUsedDrugs /> : <Login />}
                </Route>

                <Route exact path="/pessoas-usam-mesmo-medicamento">
                    {localStorage.getItem('USER_TOKEN') ? <PeopleUseSameDrugs /> : <Login />}
                </Route>
            </Switch>
        </Router>
    )
}

export default routes;