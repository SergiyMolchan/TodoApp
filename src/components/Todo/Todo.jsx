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
import RadioBtn from './RadioBtn'

class Todo extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      description: '',
      deadline: '',
      tasks: this.props.tasks,
      hideCompleted: false,
      sort: ''
    }
    this.handleAddBtn = this.handleAddBtn.bind(this);
    this.handleInputTask = this.handleInputTask.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChackbox = this.handleChackbox.bind(this);
    this.handleSortTasks = this.handleSortTasks.bind(this);
    this.sortTasks = this.sortTasks.bind(this);
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
    this.setState({description: ''}, () => {
      this.filterList();
      this.sortTasks();
    });
  }

  handleChackbox(){
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

  handleSortTasks(value){
    this.setState({sort: value}, () => this.sortTasks());
  }

  sortTasks(){
    let tasks = this.props.tasks;

    // Depending on the value of the RadioBtn returned by the component, 
    // we sort one of the cases
    switch(this.state.sort){
      case 'Alphabetically':
        tasks = tasks.sort(dynamicSort("description"));
        this.setState({tasks});
      break;

      case "ByDeadline":
        tasks = tasks.sort(dynamicSort("deadline"));
        this.setState({tasks});
      break;

      default:
        return tasks;
    }

    function dynamicSort(property) {
      var sortOrder = 1;
      if(property[0] === "-") {
          sortOrder = -1;
          property = property.substr(1);
      }
      return function (a,b) {
          /* next line works with strings and numbers, 
           * and you may want to customize it to your needs
           */
          var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
          return result * sortOrder;
      }
    }
    this.setState({tasks}, () => this.filterList());
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
            <RadioBtn onSort={this.handleSortTasks}/>
            <FormControlLabel
              control={
                <Switch color="primary" onChange={this.handleChackbox}/>
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
                      onSort={this.sortTasks}
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
  tasks: PropTypes.array.isRequired,
  onAddTask: PropTypes.func.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeleteTask: PropTypes.func.isRequired,
}

export default Todo;