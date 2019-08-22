import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import {DeleteBtn} from './Buttons';
import {SaveBtn} from './Buttons';
import {EditBtn} from './Buttons';

class TodoItem extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: this.props.task.description,
      editing: false
    }
    this.handleSaveBtn = this.handleSaveBtn.bind(this);
    this.handelEditInput = this.handelEditInput.bind(this);
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

    this.props.onEdit(this.props.task.id, description);

    if(!this.state.description){
      return
    }

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
            //defaultValue={task.description}
            value={this.state.description}
            onChange={this.handelEditInput}
            className="EditForm_input"
            name="description"
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