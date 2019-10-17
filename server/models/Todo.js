const {Schema, model} = require('mongoose');

const Todo = new Schema({
  id: {
    type: Number,
    required: true,
  },
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
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  }
});

module.exports = model('Todo', Todo);