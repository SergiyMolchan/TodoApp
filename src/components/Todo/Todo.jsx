import React from 'react';
import './Todo.sass';

class Todo extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      text: ''
    }
  }

  handleInputTask(e) {
    this.setState(
      {
        text: e.target.value
      }
    );
  }

  addTask(){
    if(!this.state.text){
      return
    }
    this.state.tasks.push(this.state.text);
    console.log(this.state.tasks);
    this.setState({text: ''});
  }

  render(){
    return(
      <div className="Todo">
        <div>
          <TodoItems tasks={this.state.tasks} />
          <input type="text" id="=addTaskText" value={this.state.text} onChange={this.handleInputTask.bind(this)}/>
          <button id="addTask" onClick={this.addTask.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}

class TodoItems extends React.Component{

  render(){
    return(
      <div className="Todo_items">
      {
        this.props.tasks.map((task, i) =>{
          return(
            <div key={i}>{task}</div>
            )
          })
        } 
      </div>
    );
  }
}

export default Todo;