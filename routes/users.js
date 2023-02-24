const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const userController = require('../controllers/users');
require('../middleware/passport')(passport);
const router = express.Router();

router.get("", passport.authenticate("jwt", { session: false }, userController.getUsers));

router.get('/:id', passport.authenticate("jwt", { session: false }), userController.getUser);

router.post('', passport.authenticate("jwt", { session: false }), userController.addUser);
router.put('/:id', passport.authenticate("jwt", { session: false }), userController.updateUser);

router.delete('/:id',passport.authenticate("jwt", { session: false }), userController.deleteUser);

router.delete('',passport.authenticate("jwt", { session: false }), userController.deleteUsers);

module.exports = router;