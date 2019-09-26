const path  = require('path');
const express  = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const Todo = require('./models/Todo');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics
app.use(express.json());
app.use(express.urlencoded({extended: false})); 

async function start(){
  try {
    //mongodb pass q1w2e3r4
    await mongoose.connect('mongodb+srv://Sergiy:q1w2e3r4@cluster0-7idyp.mongodb.net/Users', {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    });

    app.listen(PORT , () => {
      console.log(`Server is runing on ${PORT}`);
    });

  } catch (e) {
    console.log(e);
  }
}

start();


// send index.html
app.get('/', (req, res) => {
  console.log('ok');
  
  res.render('index.html');
});
