import React from 'react';
import PropTypes from 'prop-types';
import TodoItem from "./TodoItem";
import DateInput from './DateInput';
import { Stats } from "./Stats";
import './Todo.sass';
//import { createStore } from 'redux';

//Matireal UI imports
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import {AddBtn} from './Buttons';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';


class Todo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      deadline: '',
      tasks: this.props.tasks,
      hideCompleted: false
    }
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.handleInputTask = this.handleInputTask.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleSwitch = this.handleSwitch.bind(this);
  }
  handleInputTask(e) {
    this.setState({description: e.target.value});
  }

  handleChangeDate(e){
    this.setState({deadline: e.target.value})
  }

  handleAddBtn(){
    if(!this.state.description){
      return
    }
    if(!this.state.deadline){
      return
    }
    this.props.onAddTask(this.state.description, this.state.deadline);
    this.setState({description: ''}, () => this.filterList());
  }

  handleSwitch(){
    this.setState({ hideCompleted: !this.state.hideCompleted }, () => this.filterList());
  }

  filterList(){
    let tasks = this.props.tasks;
    if(this.state.hideCompleted){
      tasks = tasks.filter( task => task.completed === false );
    } else {
      tasks = this.props.tasks;
    }
    this.setState({tasks});
  }

  componentWillReceiveProps(tasks){
    if(tasks !== this.props.tasks) {
      this.filterList(); //update component if completed task at {hideCompleted: true}
    }
  }

  render(){
    return(
      <div className="Todo">
        <Card>
          <div className="Todo_header">
            <Stats tasks={this.props.tasks} />
            <FormControlLabel
              control={
                <Switch color="primary" onChange={this.handleSwitch}/>
              }
              label="hide completed"
            />
          </div>
          <div className="Todo_List">{
              this.state.tasks.map((task) => {
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
            <DateInput onDate={this.handleChangeDate}/>
            <AddBtn onAddTask={this.handleAddBtn}/>
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