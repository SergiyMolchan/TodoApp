const {Schema, model} = require('mongoose');

const schema = new Schema({
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
});

module.export = model('Todo', schema);