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
import {tasksDELETE} from './actions/tasksDELETE';

class App extends React.Component{

  constructor(props) {
    super(props);
    this.handleStatusChange = this.handleStatusChange.bind(this);
  }

    componentDidMount(){
      if(this.props.isAuth){
        this.props.tasksGET();
      }
    }

    handleStatusChange(id){
    this.props.tasks.map( (task) => {
      if(task._id === id){
        this.props.tasksUPDATE(id, task.description, !task.completed, task.deadline);
      }
      return task;
    })
  }

  render(){
    if(this.props.isAuth){
      return(
        <div className="wrepper">
          <header>
            <TodoHeader
              tasks={this.props.tasks}
              />
          </header>
          <main>
            {
              this.props.loading === false ? (     
                <Todo 
                  tasks={this.props.tasks}
                  onAddTask={this.props.tasksCREATE}
                  onStatusChange={this.handleStatusChange}
                  onDeleteTask={this.props.tasksDELETE}
                  onEdit={this.props.tasksUPDATE}
                />
              ) : (
                <LinearProgress variant="query" />
              )
            }
          </main>
      </div>
      );
    } else {
      return <Redirect to='/Auth'/>
    }
  }
}

function mapStateToProps(state){
  return {
    tasks: state.tasksCRUD.tasks,
    loading: state.tasksCRUD.loading,
    isAuth: !!state.auth.token
  }
}

function mapDispatchToProps(dispatch){
  return{
    tasksGET: () => dispatch(tasksGET()),
    tasksCREATE: (description, deadline) => dispatch(tasksCREATE(description, deadline)),
    tasksUPDATE: (id, description, completed, deadline) => dispatch(tasksUPDATE(id, description, completed, deadline)),
    tasksDELETE: (id) => dispatch(tasksDELETE(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
