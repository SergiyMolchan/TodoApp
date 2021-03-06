import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import App from './App';
import Auth from './components/authentication/Auth';
import {Provider, connect} from 'react-redux';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/rootReducer';

const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

function Application(props){
    return(
        <BrowserRouter>
            <Switch>
                <Route path='/Auth' component={Auth}/>
                <Route exact path='/' component={App} />
            </Switch>
        </BrowserRouter>
    )
}

function mapStateToProps(state){
    return {
        isAuth: !!state.auth.token
    }
}
connect(mapStateToProps)(Application);
ReactDOM.render(
<Provider store={store} >
    <Application/>
</Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
