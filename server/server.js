const path  = require('path');
const express  = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/Users.js');

const app = express();

app.use((req, res, next) => {
  try {
    const user = User.findById({_id: '5dc434fa328e265418558001'});
    req.user = user;
    next();
  } catch (e) {
    console.error(e);
  }
});

app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

//configuration
const PORT = process.env.PORT || 3000;
const dbLogin = {
  login: 'Sergiy',
  password: 'q1w2e3r4'
}

// start server
function start(){
  try {
    mongoose.connect(`mongodb+srv://${dbLogin.login}:${dbLogin.password}@cluster0-7idyp.mongodb.net/TodoViewer`, 
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      findOneAndDelete: true,
      findOneAndUpdate: true
    });
    mongoose.Promise = global.Promise;
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error:'));
    db.once('open', function() {
      console.info('we\'re connected with databases');
    });

    app.listen(PORT , () => {
      console.info(`Server is runing on ${PORT}`);
    });
    
  } catch (e) {
    console.error(e);
  }
}

start();

//API
app.post('/registration', (req, res) => register(req, res));

async function register(req, res) {
  try {

    let candidate = await User.findOne({name: req.body.name});

    if(!req.body.name || req.body.name.length < 4){
      res.status(409).json({message: "Enter your name."});
    } else if (candidate){
      res.status(409).json({message: "A user with the same name already exists, use a different name."});
    } else if (!req.body.password || req.body.password.length < 6){
      res.status(409).json({message: "Enter your password more 6 symbols."});
    } else if (req.body.password !== req.body.repeatPassword){
      res.status(409).json({message: "Passwords must be identical."});
    } else {   
      const user = new User({
        name: req.body.name.trim(),
        password: req.body.password.trim(),
        tasks: []
      });
      await user.save();
      res.status(201).json({user});
    }
  } catch (e) {
    console.error(e);
    res.status(409).json({message: "Registration failed."});
  }
}

app.post('/createTask', (req, res) => res.send(createTask(req)));

async function createTask(req) {
  const task = {
    description: 'qqqq',
    completed: true,
    deadline: "2020-09-15T10:30",
  }

  try {
    User.findOneAndUpdate({_id: '5dc434fa328e265418558001'}, {$push: {tasks: task}}, (err, user) => {
      if(err) return console.log(err);
      return user;
    });
  } catch (e) {
    console.error(e);
    return e;
  }
}

// send index.html
app.get('/', (req, res) => {
  console.log('ok');
  
  res.render('index.html');
});

