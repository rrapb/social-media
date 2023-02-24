const Joi = require('joi')
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const {User} = require('../models/user');
const { createJwt } = require("../helpers/JwtCreation");

const login = async(req, res) => {
    const {error} = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let user = await User.findOne({email: req.body.email});
    if (!user) return res.status(400).send('Invalid!');
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid');
    const token = await createJwt({
        id: user.id,
    });
    res.send({
        status:200,
        success:true,
        token
    });
 }

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(req);
}

module.exports = {login};