import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import Auth from './components/authentication/Auth';
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom';

ReactDOM.render(
 <BrowserRouter>
    <Switch>
        <Route path='/Auth' component={Auth}/>
        {localStorage.getItem('jwt-token') ? <Route exact path='/' component={App} /> : <Redirect to='/Auth'/>}  
    </Switch>
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
