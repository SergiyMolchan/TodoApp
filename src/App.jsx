import React from 'react';
//import logo from './logo.svg';
import './App.sass';
import TodoHeader from './components/TodoHeader/TodoHeader';
import Todo from './components/Todo/Todo';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {tasksGET} from './actions/tasksGET'

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handeleAddTask = this.handeleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  componentDidMount(){
    this.props.tasksGET();
  }

  async handeleAddTask(description, deadline){
    let length = 0;
    
    if(this.state.tasks.length !== 0)
    {
      // помилка виникає при сортуванні і додаванні нового завдання,
      // тому що останній елемент не завжди має набільший id.
      length = Math.max.apply(Math, this.state.tasks.map(function(task) { return task._id; }));
      length++;
    }
    else
    {
      length = 1;
    }
    let newTask = {
      _id: NaN,
      description: '',
      completed: false,
      deadline: ''
    };

    description = description[0].toUpperCase() + description.substring(1);
    newTask._id = length;
    newTask.description = description;
    newTask.deadline = deadline;

    
    const url = '/api/tasks/';
    const data = {description: description, deadline: deadline};
    try {
      const res = await fetch(url, {
        method: 'POST',
        cors: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${localStorage.getItem('jwt-token')}`
        },
        body: JSON.stringify(data)
      });
      const json = await res.json();
      
      if(res.status === 200){
        let tasks = this.state.tasks.concat(json);
        this.setState({tasks: tasks});
      }

    } catch (error) {
      console.error(error);
    }
  }

    handleStatusChange(id){
    let tasks = this.state.tasks.map( (task) => {
      if(task._id === id){
        task.completed = !task.completed;
      }
      return task;
    })
    this.setState({tasks});
  }

  handleDeleteTask (id) {
    let tasks = this.state.tasks.filter( task => task._id !== id );
    this.setState({tasks});
  }

  handleEditTask(id, description, deadline){
    description = description[0].toUpperCase() + description.substring(1);
    let tasks = this.state.tasks.map(task => {
      if(id === task._id){
        task.description = description;
        task.deadline = deadline;
      }

      return task;
    });

    this.setState({ tasks });
  }

  render(){
    if(!this.state.redirect){

      return(
        <div className="wrepper">
      <header>
        <TodoHeader
          tasks={this.state.tasks}
          />
      </header>
      <main>
        {
          this.props.tasks.length !== 0 ? (     
            <Todo 
              tasks={this.props.tasks}
              onAddTask={this.handeleAddTask}
              onStatusChange={this.handleStatusChange}
              onDeleteTask={this.handleDeleteTask}
              onEdit={this.handleEditTask}
            />
          ) : (
            <p>download</p>
          )
        }
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
    );
  }
  else
  {
    return(
      <Redirect to='/Auth'/>
    )
  }
  }
}

function mapStateToProps(state){
  return {
    tasks: state.tasksCRUD.tasks,
    loading: state.tasksCRUD.loading
  }
}

function mapDispatchToProps(dispatch){
  return{
    tasksGET: () => dispatch(tasksGET()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
