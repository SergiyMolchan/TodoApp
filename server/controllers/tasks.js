const User = require('../models/Users.js');
const errorHandler = require('../utils/errorHandler.js');

module.exports.getTasks = async function(req, res){
    try {
        const Tasks = await User.findOne({_id: req.user.id});
        res.status(200).json(Tasks.tasks);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.create = async function(req, res) {
    try {
        const task = {
            description: req.body.description,
            completed: false,
            deadline: req.body.deadline, //"2020-09-15T10:30"
        }
        const user = await User.findOneAndUpdate({_id: req.user.id}, {$push: {tasks: task}}, {new: true});
        res.status(200).json(user.tasks);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.update = async function(req, res){
    try {
        const user = await User.findOneAndUpdate({_id: req.user.id, 'tasks._id': req.body.id}, {$set: {'tasks.$.description': req.body.description, 'tasks.$.completed': req.body.completed, 'tasks.$.deadline': req.body.deadline}}, {new: true});
        res.status(200).json(user.tasks);
    } catch (e) {
        errorHandler(res, e);
    }
}

module.exports.delete = async function(req, res) {
    try {
        const user = await User.findOneAndUpdate({_id: req.user.id}, {$pull: {tasks: {_id: req.body.id}}}, {new: true});
        res.status(200).json(user.tasks);
    } catch (e) {
        errorHandler(res, e);
    }
}