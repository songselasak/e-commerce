const path = require('path')
const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/signin', userController.signIn);
router.get('/signup', userController.signUp);
router.get('/register', userController.register);


module.exports = router;