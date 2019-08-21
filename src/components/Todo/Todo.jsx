import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';
//import { createStore } from 'redux';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import {AddBtn} from './Buttons';
import {DeleteBtn} from './Buttons';
import {SaveBtn} from './Buttons';
import {EditBtn} from './Buttons';

class Todo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      editing: true
    }
    this.handleInputTask = this.handleInputTask.bind(this);
  }
  handleInputTask(e) {
    this.setState({description: e.target.value});
  }

  handleBtn(){
    if(!this.state.description){
      return
    }
    this.props.onAddTask(this.state.description)
    this.setState({description: ''});
  }

  handleEditBtn(){
    //console.log(this.satate.editing)
    this.setState({editing: true})
  }

  handleSaveBtn(){
    this.setState({editing: false});
  }

  renderDisplay(task){
    return(
      <div className="Todo_Item-wrapper">
        <div className={`Todo_Item-view ${task.completed ? 'completed' : ''}`}>
          <Checkbox
            color="primary"
            checked={task.completed}  
            onChange={ () => {
            this.props.onStatusChange(task.id)
            }}
          />
          <div className="Todo_Item-description">{task.description}</div>
        </div>
        <div className="Todo_Item-controller">
          <DeleteBtn
            onDelete={() => this.props.onDeleteTask(task.id) }
            className="Todo_Item-delete"
          />
                
          <EditBtn 
            onEditTask={this.handleEditBtn.bind(this)}
          />
        </div>
      </div>
    )
  }

  renderEditForm(task){
    return(
      <div className="Todo_Item-EditForm">
        <form action="#" className="EditForm">
          <TextField 
            defaultValue={task.description}
            className="EditForm_input"
          />
          <SaveBtn 
           onSaveTask={this.handleSaveBtn.bind(this)}
          />
        </form>
      </div>
    )
  }

  render(){
    return(
      <div className="Todo">
        <Card>
          <div>{
              this.props.tasks.map((task) => {
                  return(
                    <div key={task.id} className="Todo_Item">
                      {this.state.editing ? this.renderEditForm(task) : this.renderDisplay(task)}
                    </div>
                  )
              })
          }</div>
          <div className="Todo_Controller">
            <TextField
              className="Todo_Controller-input" 
              type="text" 
              placeholder="Description of the task"
              value={this.state.description} onChange={this.handleInputTask}
            />
            <AddBtn onAddTask={this.handleBtn.bind(this)}/>
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