const mongoose = require('mongoose');
const Joi = require('joi');
const post_id = {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
const user_id = {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required:false
    },
    post_id: post_id,

    user_id: user_id


});

const Comment = mongoose.model('Comment', commentSchema);

function validateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().required(),
        post_id: Joi.string().required(),
        user_id: Joi.string().required()
    })
    return schema.validate(comment);
}

function validateUpdateComment(comment) {
    const schema = Joi.object({
        text: Joi.string().required(),
    })
    return schema.validate(comment);
}

exports.Comment = Comment;
exports.commentSchema = commentSchema;
exports.validateUpdateComment = validateUpdateComment;
exports.validateComment = validateComment;