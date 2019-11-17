const express = require('express');
const controller = require('../controllers/auth.js');
const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({extended: false})); 

router.post('/login', controller.login);

router.post('/registration', controller.register);

module.exports = router;