import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';
//import TodoList from './Todo_list'
//import { createStore } from 'redux';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import AddBtn from './addBtn';
import DeleteBtn from './DeleteBtn'

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

  handleBtn(){
    if(!this.state.description){
      return
    }
    this.props.onAddTask(this.state.description)
    console.log(this.props);
    this.setState({description: ''});
  }

  render(){
    return(
      <div className="Todo">
        <Card>
          <div>{
              this.props.tasks.map((task) => { //тут поломка траба полагодити
                return(
                  <div key={task.id} className="Todo_Item">
                    <Checkbox
                      color="primary"
                      checked={task.completed}  
                      onChange={ () => {
                      this.props.onStatusChange(task.id)
                      }}
                    />
                    <div>{task.description}</div>
        
                    <DeleteBtn
                      onDelete={() => this.props.onDeleteTask(task.id) }
                      className="Todo_Item-delete"
                    />
                  </div>
                )
              })
            }</div>
          <div className="Todo_Controller">
            <TextField 
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