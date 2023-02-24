const express = require('express');
const bcrypt = require('bcrypt');
const {userValidate, User} = require("../models/user");
const passport = require('passport');
require('../middleware/passport')(passport);
const router = express.Router();
const _ = require('lodash');
const {createJwt} = require("../helpers/JwtCreation");
;
require('dotenv').config()

const getUsers = async(req, res) => {
    const users = await User.find().select('-password');
    if(users.length === 0){
        return res.status(404).send('There is no user');
    }
    res.send(users);
};

const getUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    if(!user) return res.status(404).send('The user with the given ID was not found');
    res.send(_.pick(user, ['_id', 'username', 'email']));
};

const addUser = async (req, res) => {
    const {error} = userValidate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if(user) return res.status(403).send('User already registred !');

    user = new User(_.pick(req.body, ['name','surname','username', 'email', 'password']));
    // user = new User({
    //     name: req.body.name,
    //     surname: req.body.surname,
    //     username: req.body.username,
    //     email: req.body.email,
    //     password: req.body.email
    // })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
    await user.save();
    const token = await createJwt({
        id: user.id,
    });
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name','surname','username', 'email']));
};

const updateUser = async (req, res) => {
    let user = await User.findById(req.params.id);
    if(!req.body.name || !req.body.surname || user.name === req.body.name ||  user.surname === req.body.surname){
        return res.status(403).send('Fullname must be typed and cannot be updated as a same fullname')

    }
    user = await User.findByIdAndUpdate(req.params.id, { name: req.body.name, surname: req.body.surname},{
        new: true
    });
    if(!user) return res.status(404).send('The user with the given ID was not found');
    res.send(_.pick(user,['name','surname']));
};

const deleteUser = async(req, res) => {
    const user = await User.findByIdAndRemove(req.params.id);
    if(!user) return res.status(404).send('The user with the given ID does not exist');
    res.send(_.pick(user, ['_id', 'username', 'email']))
};

const deleteUsers = async(req, res) => {
    let users = await User.find().select('-password');
    if(!users || users.length === 0){
        return res.status(404).send('There is no user');
    }
    users = await User.deleteMany();
    res.send('Deleted ' + users.deletedCount + ' users');
};

module.exports = {
    getUser,
    getUsers,
    addUser,
    updateUser,
    deleteUser,
    deleteUsers
}