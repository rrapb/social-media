const mongoose = require('mongoose');
const Joi = require('joi');
const user_id = {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

const postSchema = new mongoose.Schema({
    post_title: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },
    description: {
        type: String,
        required: false,
        minlength: 5,
        maxlength: 255
    },
    user_id: user_id,

    date: {
        type: Date
    }

});

const Post = mongoose.model('Post', postSchema);

function validatePost(post) {
    const schema = Joi.object({
        post_title: Joi.string().min(3).required(),
        user_id: Joi.string().required(),
        description: Joi.string().required()
    });
    return schema.validate(post);
}

function validateUpdatePost(post){
    const schema = Joi.object({
        post_title : Joi.string().min(3).required(),
        description : Joi.string().required()
    })
    return schema.validate(post)
}


exports.Post = Post;
exports.postSchema = postSchema;
exports.validatePost = validatePost;
exports.validateUpdatePost = validateUpdatePost;