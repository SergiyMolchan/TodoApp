import React from 'react';
//import logo from './logo.svg';
import './App.sass';

import styles from './App.sass';

import Todo from './components/Todo/Todo'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 0,
          description: 'create todo array',
          completed: true
        },
        {
          id: 1,
          description: 'join softserve IT Academy',
          completed: false
        }
      ],
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handeleAddTask = this.handeleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  handeleAddTask(description){
    let length = 0;
    if(this.state.tasks.length !== 0)
    {
      length = this.state.tasks[this.state.tasks.length - 1].id + 1;
    }
    else
    {
      length = 1;
    }
    let newTask = {
      id: NaN,
      description: '',
      completed: false
    };

    newTask.id = length;
    newTask.description = description;
    let tasks = this.state.tasks.concat(newTask);
    this.setState({tasks: tasks});
  }

    handleStatusChange(id){
    let tasks = this.state.tasks.map( (task) => {
      if(task.id === id){
        task.completed = !task.completed;
      }
      return task;
    })
    this.setState({tasks});
  }

  handleDeleteTask (id) {
    let tasks = this.state.tasks.filter( task => task.id !== id );
    this.setState({tasks});
  }

  handleEditTask(id, description){
    let tasks = this.state.tasks.map(task => {

      if(id === task.id){
        task.description = description;
      }

      return task;
    });

    this.setState({ tasks });

  }

  render(){
    return(
    <div className={styles.wrepper}>
      <header>
        <p>header</p>
      </header>
      <main>
        <Todo 
          tasks={this.state.tasks}
          onAddTask={this.handeleAddTask}
          onStatusChange={this.handleStatusChange}
          onDeleteTask={this.handleDeleteTask}
          onEdit={this.handleEditTask}
        />
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
    );
  }
}

export default App;
