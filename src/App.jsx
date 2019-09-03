import React from 'react';
//import logo from './logo.svg';
import './App.sass';
import TodoHeader from './components/TodoHeader/TodoHeader';
import Todo from './components/Todo/Todo';


class App extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        {
          id: 0,
          description: 'create todo array',
          completed: true,
          deadline: "2019-09-15T10:30"
        },
        {
          id: 1,
          description: 'join softserve IT Academy',
          completed: false,
          deadline: "2019-10-24T11:30"
        },
        {
          id: 2,
          description: 'Created portfolio',
          completed: false,
          deadline: "2017-05-24T12:30"
        },
        {
          id: 3,
          description: 'to sleep',
          completed: true,
          deadline: "2020-05-24T13:30"
        }
      ],
    }
    this.handleStatusChange = this.handleStatusChange.bind(this);
    this.handleDeleteTask = this.handleDeleteTask.bind(this);
    this.handeleAddTask = this.handeleAddTask.bind(this);
    this.handleEditTask = this.handleEditTask.bind(this);
  }

  handeleAddTask(description, deadline){
    let length = 0;
    if(this.state.tasks.length !== 0)
    {
      length = this.state.tasks[this.state.tasks.length - 1].id + 1;
    }
    else
    {
      length = 1;
    }
    let newTask = {
      id: NaN,
      description: '',
      completed: false,
      deadline: 54
    };

    newTask.id = length;
    newTask.description = description;
    newTask.deadline = deadline;
    let tasks = this.state.tasks.concat(newTask);
    this.setState({tasks: tasks});
  }

    handleStatusChange(id){
    let tasks = this.state.tasks.map( (task) => {
      if(task.id === id){
        task.completed = !task.completed;
      }
      return task;
    })
    this.setState({tasks});
  }

  handleDeleteTask (id) {
    let tasks = this.state.tasks.filter( task => task.id !== id );
    this.setState({tasks});
  }

  handleEditTask(id, description, deadline){
    let tasks = this.state.tasks.map(task => {

      if(id === task.id){
        task.description = description;
        task.deadline = deadline;
      }

      return task;
    });

    this.setState({ tasks });
  }

  render(){
    return(
    <div className="wrepper">
      <header>
        <TodoHeader
          tasks={this.state.tasks}
        />
      </header>
      <main>
        <Todo 
          tasks={this.state.tasks}
          onAddTask={this.handeleAddTask}
          onStatusChange={this.handleStatusChange}
          onDeleteTask={this.handleDeleteTask}
          onEdit={this.handleEditTask}
        />
      </main>
      <footer>
        <h1>footer</h1>
      </footer>
    </div>
    );
  }
}

export default App;
