import React from 'react';
/**
 * react-router-dom => Configura a parte de rotas na aplicação
 * BrowserRouter: Ele é um router, que fica por volta de todas as rotas, responsavel pelo funcionamento do roteamento
 * Route: Responsavel por cada uma das rotas
 * Switch: Garante que apenas uma rota seja executada por momento, chamada por momento, mesmo que seja semelhante 
 */
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// Importando a page Logon
import Logon from './pages/Logon';
import Register from './pages/Register'
import Profile from './pages/Profile'
import NewIncident from './pages/NewIncident'
// Component: 
export default function Routes() {
    return (
        // BrowserRoute, precisa estar por volta de tudo
        // No Route, exact serve para não "atrapalhar as demais paginas".
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}></Route>
                <Route path="/register" component={Register}></Route>
                <Route path="/profile" component={Profile}></Route>
                <Route path="/incidents/new" component={NewIncident}></Route>
            </Switch>
        </BrowserRouter>
    );
}

