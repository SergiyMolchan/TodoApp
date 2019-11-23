const User = require('../models/Users.js');
const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const errorHandler = require('../utils/errorHandler.js');
module.exports.login = async function(req, res){
    const candidate = await User.findOne({name: req.body.name});

    if (candidate) {
      const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
      if (passwordResult) {
        //LOGIN
        const token = jwt.sign({
          name: candidate.name,
          id: candidate._id
        }, config.jwt, {expiresIn: 60 * 60});
  
        res.status(200).json({token: `Bearer ${token}`});
      } else {
        res.status(401).json({message: "Invalid password."});
      }
    } else {
      res.status(404).json({message: "User is not found."});
    }
  }

  module.exports.register = async function(req, res) {
    try {
      let candidate = await User.findOne({name: req.body.name});
  
      if(!req.body.name || req.body.name.length < 4){
        res.status(409).json({message: "Enter your name."});
      } else if (candidate){
        res.status(409).json({message: "Name is already taken."});
      } else if (!req.body.password || req.body.password.length < 6){
        res.status(409).json({message: "Enter your password more 6 symbols."});
      } else if (req.body.password !== req.body.repeatPassword){
        res.status(409).json({message: "Passwords must be identical."});
      } else {   
        const salt = bcrypt.genSaltSync(7);
        const user = new User({
          name: req.body.name.trim(),
          password: bcrypt.hashSync(req.body.password.trim(), salt),
          tasks: []
        });
        await user.save();
        res.status(201).json({message: "Registered."});
      }
    } catch (e) {
      console.error(e);
      errorHandler(res, e);
    }
  }