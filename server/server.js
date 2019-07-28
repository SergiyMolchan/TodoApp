const path  = require('path');
const express  = require('express');
const app = express();

const bodyParser = require("body-parser");

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

const port = 9080;

app.use(express.static(path.join(__dirname, '..', '/public'))); //path statics

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.post('/server.js', upload.array(), (req, res) => {
  console.log(req.body);
  
  res.json(req.body);
});

app.listen(port, () => {
  console.log('Server runing');
});