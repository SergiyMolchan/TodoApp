const path  = require('path');
const express  = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');
const User = require('./models/User.js');

const app = express();

const PORT = process.env.PORT || 3000;
const dbLogin = {
  login: 'Sergiy',
  password: 'q1w2e3r4'
}

app.use((req, res, next) => {
  try {
    const user = User.findById('5da4889fe981e253d532fba8');
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
  }
});
app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

function start(){
  try {
    mongoose.connect(`mongodb+srv://${dbLogin.login}:${dbLogin.password}@cluster0-7idyp.mongodb.net/TodoViewer`, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    const db = mongoose.connection;
    db.once('open', function() {
      console.info('we\'re connected with databases');
    });
      
    createdUser();

    app.listen(PORT , () => {
      console.info(`Server is runing on ${PORT}`);
    });
    
  } catch (e) {
    console.error(e);
  }
}

start();

function createdUser() {
  try {
      const user = new User({
        name: 'Sergiy',
        password: '123456',
        tasks: []
      });

      user.addTask(new Todo({
        id: 0,
        description: 'Create todo array',
        completed: true,
        deadline: "2019-09-15T10:30",
        userId: '5d9b1e0d1a200947a8a4f6ad' //req.user._id
      }));

      user.save(e => console.error(e));

     // User.find({name: 'Sergiy'}, () => console.log(user));
  } catch (e) {
    console.error(e);
  }
}

app.post('/create', (req, res) => {
  res.send(createTask(req));
});

function createTask(req){
  const task = new Todo({
    id: 0,
    description: 'Create todo array',
    completed: true,
    deadline: "2019-09-15T10:30",
    userId: '5d9b1e0d1a200947a8a4f6ad' //req.user._id
  })

  req.user.addTask(task);

  //task.save(e => console.error(e));
  return task;
}

// send index.html
app.get('/', (req, res) => {
  console.log('ok');
  
  res.render('index.html');
});

