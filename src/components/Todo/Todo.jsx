import React from 'react';
import './Todo.sass';

class Todo extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          description: 'create todo array',
          completed: true
        }
      ],
      description: ''
    }
  }

  handleInputTask(e) {
    this.setState(
      {
        description: e.target.value
      }
    );
  }

  addTask(){
    if(!this.state.description){
      return
    }

    let newTask = {
      description: '',
      completed: false
    }
    
    newTask.description = this.state.description;

    this.state.tasks.push(newTask);
    console.log(this.state.tasks);
    this.setState({description: ''});
  }

  render(){
    return(
      <div className="Todo">
        <div>
          <TodoItems tasks={this.state.tasks} />
          <input type="text" id="=addTaskText" value={this.state.description} onChange={this.handleInputTask.bind(this)}/>
          <button id="addTask" onClick={this.addTask.bind(this)}>Add</button>
        </div>
      </div>
    );
  }
}

class TodoItems extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
      };

  }

  //  need reduks to solve the problem

  toggleChange(task){
    this.setState({
      //task.completed: !this.state.task.completed
    });
  }

  render(){
    return(
      <div className="Todo_items">
      {
        this.props.tasks.map((task, i) =>{
          return(
            <div key={i}>
              <input
                type="checkbox" 
                checked={task.completed}  
                //onChange={this.setState({})}
              />
              <div>{task.description}</div>
            </div>
            )
          })
        } 
      </div>
    );
  }
}

export default Todo;