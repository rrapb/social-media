const express = require('express');
const router = express.Router();
const _ = require('lodash');
const {validatePost, validateUpdatePost, Post} = require("../models/post");
const {User} = require('../models/user');
var date = new Date();

const getPosts = async (req, res) => {
    const posts = await Post.find();
    if (posts.length === 0) {
        return res.status(404).send('There is no post!');
    }
    res.send(posts);
};

const deletePost = async (req, res) => {
    const parameter = req.params.id;
    if(!parameter){
        return res.status(400).send('You should give the id of post you want to delete!');  
    }
    let post = await Post.findByIdAndDelete(req.params.id);
    if(!post){
        return res.status(404).send('There is no Post with the given Id');
    }
    res.send(post);

}

const deletePosts = async (req, res) => {
    let posts = await Post.find().select('-password');
    if(!posts || posts.length === 0){
        return res.status(404).send('There is no post available!');
    }
    posts = await Post.deleteMany();
    res.send('Deleted ' + posts.deletedCount + ' posts');
};

const addPost = async (req, res) => {
    const {error} = validatePost(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    const user = await User.findById(req.body.user_id);
    if (!user) return res.status(404).send('There is no user with the given id');

    let post = await Post.findOne({post_title: req.body.post_title});
    if (post) return res.status(403).send('Post already exists!')
    // post = new Post(_.pick(req.body, ['user_id', 'post_title', 'description']))
    post = new Post({
        user_id: req.body.user_id,
        post_title: req.body.post_title,
        description: req.body.description,
        date: date
    });
    await post.save();
    res.send(post);
};

const updatePost = async (req, res) => {
    const {error} = validateUpdatePost(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    let post = await Post.findByIdAndUpdate(req.params.id, {post_title: req.body.post_title, description: req.body.description},
        {
            new: true
    });
    if(!post) return res.status(404).send('Post with the given Id does not exist');
    res.send(post);
}

module.exports = {
    getPosts,
    addPost,
    updatePost,
    deletePost,
    deletePosts
}