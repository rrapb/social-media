const Joi = require('joi')
const express = require('express');
const router = express.Router();
const passport = require("passport");
require('../middleware/passport')(passport);
const loginController = require('../controllers/auth');

router.post('',loginController.login);


module.exports = router;