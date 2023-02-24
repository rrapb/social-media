const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required: false,
        minLength:5,
        maxLength:10
    },
    surname: {
        type:String,
        required: false,
        minLength:5,
        maxLength:10
    },

    username: {
        type:String,
        required: false,
        minLength:5,
        maxLength:10
    },
    email: {
        type:String,
        required:false,
        unique: false
    },
    password: {
        type:String,
        required:false,
        minLength:5,
        maxLength: 255
    }
});

const User = mongoose.model('User', userSchema);

function userValidate(user){
    const schema = Joi.object({
        username: Joi.string().min(5).max(10).required(),
        email: Joi.string().email().required().email(),
        password: Joi.string().min(5).max(25).required(),
        name: Joi.string().min(5).max(10).required(),
        surname: Joi.string().min(5).max(10).required()
    })
    return schema.validate(user);
}

// module.exports = {User}
exports.User = User;
exports.userSchema = userSchema;
module.exports.userValidate = userValidate;