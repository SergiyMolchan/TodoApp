const { Schema, model } = require('mongoose');

const User = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  tasks: [
    {
      ref: 'Todo',
      type: Schema.Types.ObjectId,
    }
  ] 
});

User.methods.addTask = function(task){
  const tasks = [...this.tasks];
  tasks.push(task);
  
  this.tasks = {tasks};
  
  //console.log(this.tasks);
  return this.save();
}

module.exports = model('User', User);