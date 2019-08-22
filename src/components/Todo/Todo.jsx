import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";
import './Todo.sass';
//import { createStore } from 'redux';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {AddBtn} from './Buttons';


class Todo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
    }
    this.handleInputTask = this.handleInputTask.bind(this);
  }
  handleInputTask(e) {
    this.setState({description: e.target.value});
  }

  handleAddBtn(){
    if(!this.state.description){
      return
    }
    this.props.onAddTask(this.state.description)
    this.setState({description: ''});
  }

  render(){
    return(
      <div className="Todo">
        <Card>
          <div>{
              this.props.tasks.map((task) => {
                  return(
                    <TodoItem
                      key={task.id} 
                      task={task}
                      onStatusChange={this.props.onStatusChange}
                      onDeleteTask={this.props.onDeleteTask}
                      onEdit={this.props.onEdit}
                    />
                  )
              })
          }</div>
          <div className="Todo_Controller">
            <TextField
              className="Todo_Controller-input" 
              type="text" 
              placeholder="Description of the task"
              value={this.state.description} 
              onChange={this.handleInputTask}
            />
            <AddBtn onAddTask={this.handleAddBtn.bind(this)}/>
          </div>
        </Card>
      </div>
    );
  }
}

Todo.protTypes = {
 tasks: PropTypes.array.isRequired
}

export default Todo;