const { Schema, model } = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    createIndexes:{
      unique: true,
    }
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  tasks: [{
    description: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
      required: true,
    },
    deadline:{
      type: String,
      required: true,
    }
  }] 
});

// User.methods.addTask = function(task){
//   const tasks = [...this.tasks];
//   tasks.push(task);
  
//   this.tasks = {tasks};
//   console.log(task);
//   console.log(this.tasks);
//   return tasks;
// }

module.exports = model('User', User);