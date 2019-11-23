const path  = require('path');
const express  = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const config = require('./config/config.js');
const authRoutes = require('./routes/auth.js');
const tasksRouters = require('./routes/tasks.js');
const app = express();

app.use(passport.initialize());
require('./middleware/passport.js')(passport);

app.use('/api/auth', authRoutes);
app.use('/api/tasks', tasksRouters);
app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

//configuration
const PORT = process.env.PORT || 4000;

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

// send index.html
app.get('/', (req, res) => {
  console.log('ok');
  
  res.render('index.html');
});

