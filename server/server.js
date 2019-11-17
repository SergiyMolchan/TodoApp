const path  = require('path');
const express  = require('express');
//const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/Users.js');
const config = require('./config/config.js');
const authRoutes = require('./routes/auth.js');
const app = express();

app.use('/api/auth', authRoutes);
app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

//configuration
const PORT = process.env.PORT || 3000;

// start server
function start(){
  try {
    mongoose.connect(config.mongoURI, 
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
      console.info('MongoDB conected');
    });

    app.listen(PORT , () => {
      console.info(`Server is runing on ${PORT}`);
    });
    
  } catch (e) {
    console.error(e);
  }
}

start();

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

