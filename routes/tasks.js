const express = require('express');
const controller = require('../controllers/tasks.js');
const passport = require('passport');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.get('/', passport.authenticate('jwt', {session: false}), controller.getTasks);
router.post('/', passport.authenticate('jwt', {session: false}), controller.create);
router.put('/', passport.authenticate('jwt', {session: false}), controller.update);
router.delete('/', passport.authenticate('jwt', {session: false}), controller.delete);

module.exports = router;