import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';
//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
//import DateInput from './DateInput';
import {DeleteBtn} from './Buttons';
import {SaveBtn} from './Buttons';
import {EditBtn} from './Buttons';



class TodoItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.task.description,
      deadline: this.props.task.deadline,
      editing: false
    }
    this.handleSaveBtn = this.handleSaveBtn.bind(this);
    this.handelEditInput = this.handelEditInput.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  handleEditBtn(){
    this.setState({editing: true})
  }

  handelEditInput(e){
    this.setState({description: e.target.value});
  }

  handleSaveBtn(e){
    e.preventDefault();
    let description = this.state.description;
    let deadline = this.state.deadline;

    this.props.onEdit(this.props.task.id, description, deadline);

    if(!this.state.description){
      return
    }
    if(!this.state.deadline){
      return
    }

    this.setState({editing: false});
  }

  handleChangeDate(e){
    this.setState({deadline: e.target.value});
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
        <div className="Todo_Item-deadline">
          <TextField
            id="datetime-local"
            label="Deadline"
            value={this.props.task.deadline}
            type="datetime-local"
            disabled={true}
            InputLabelProps={{
              shrink: true,
            }}
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
            //defaultValue={task.description}
            value={this.state.description}
            onChange={this.handelEditInput}
            className="EditForm_input"
            name="description"
          />
          <TextField
            onChange={this.handleChangeDate}
            id="datetime-local"
            label="Deadline"
            //defaultValue={this.state.deadline}
            value={this.state.deadline}
            type="datetime-local"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <SaveBtn
            onSaveTask={this.handleSaveBtn}
          />
        </form>
      </div>
    )
  }

  render(){
    return(        
      <div className="Todo_Item">
        {this.state.editing ? this.renderEditForm(this.props.task) : this.renderDisplay(this.props.task)}
      </div>
    );
  }
}

TodoItem.protTypes = {
  task: PropTypes.object,
  onEdit: PropTypes.func
}

export default TodoItem;