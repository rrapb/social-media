const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middleware/passport')(passport);
const {validateComment, validateUpdateComment,Comment} = require("../models/comment");
const { Post } = require('../models/post');
const { User } = require('../models/user');

const getComments = async (req, res) => {
    const {error} = validateComment(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    const comments = await Comment.find();
    if (comments.length === 0) {
        return res.status(404).send('There is no comment');
    }
    res.send(comments);
};

const getComment = async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
};

const addComment = async (req, res) => {
    const {error} = validateComment(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    let post = await Post.findById(req.body.post_id);
    if(!post) return res.status(404).send('Post with the given Id does not exist');

    let user = await User.findById(req.body.user_id);
    if(!user) return res.status(404).send('User with the given Id does not exist');

    let comment = new Comment({
        text: req.body.text, post_id: req.body.post_id, user_id: req.body.user_id,
    });

    await comment.save();
    res.send(comment);

};

const updateComments = async (req, res) => {
    const {error} = validateUpdateComment(req.body);
    if (error) return res.status(403).send(error.details[0].message);
    const comment = await Comment.findByIdAndUpdate(req.params.id, {text: req.body.text}, {
        new: true
    });
    if (!comment) return res.status(404).send('The comment with the given ID was not found');
    res.send(comment);
};

const deleteComment = async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment) return res.status(404).send('The comment with the given ID does not exist');
    res.send(comment);
};

const deleteComments = async (req, res) => {
    const comments = await Comment.deleteMany();
    res.send('Deleted ' + comments.deletedCount + ' documents');
}

module.exports = {
    getComment,
    getComments,
    addComment,
    updateComments,
    deleteComment,
    deleteComments
}
