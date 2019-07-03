import React from 'react';
//import logo from './logo.svg';
import './App.sass';

import Layout from './hoc/Layout/Layout'
import Todo from './components/Todo/Todo'

class App extends React.Component{

  render(){
    return(
      <Layout>
        <Todo />
      </Layout>
    );
  }
}

export default App;
