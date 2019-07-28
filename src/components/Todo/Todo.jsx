import React from 'react';
import PropTypes from 'prop-types';
import './Todo.sass';
//import { createStore } from 'redux';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import Checkbox from '@material-ui/core/Checkbox';
import {AddBtn} from './Buttons'
//import {SaveBtn} from './Buttons';
import {DeleteBtn} from './Buttons'

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
                    <div>
                      <Checkbox
                        color="primary"
                        checked={task.completed}  
                        onChange={ () => {
                        this.props.onStatusChange(task.id)
                        }}
                      />
                      <div>{task.description}</div>
                    </div>
        
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