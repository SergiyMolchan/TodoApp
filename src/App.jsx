import React from 'react';
//import logo from './logo.svg';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.sass';
import TodoHeader from './components/TodoHeader/TodoHeader';
import Todo from './components/Todo/Todo';
import {Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {tasksGET} from './actions/tasksGET'
import {tasksCREATE} from './actions/tasksCREATE';
import {tasksUPDATE} from './actions/tasksUPDATE';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      redirect: false
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

    componentDidMount(){
      this.props.tasksGET();
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
          this.props.loading === false ? (     
            <Todo 
              tasks={this.props.tasks}
              onAddTask={this.props.tasksCREATE}
              onStatusChange={this.handleStatusChange}
              onDeleteTask={this.handleDeleteTask}
              onEdit={this.props.tasksUPDATE}
            />
          ) : (
            <LinearProgress variant="query" />
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
    tasksCREATE: (description, deadline) => dispatch(tasksCREATE(description, deadline)),
    tasksUPDATE: (id, description, completed, deadline) => dispatch(tasksUPDATE(id, description, completed, deadline))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
