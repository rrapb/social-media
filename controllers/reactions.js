const express = require('express');
const router = express.Router();
const {validateReaction,validateUpdateReaction, Reaction} = require("../models/reaction");
const { User } = require('../models/user');
const { Post } = require('../models/post');

const getReactions = async (req, res) => {
    const {error} = validateReaction(req.body);
    if (error) return res.status(403).send(error.details[0].message);

    const reactions = await Reaction.find().sort('name');
    if (reactions.length === 0) {
        return res.status(404).send('There is no reaction');
    }
    res.send(reactions);
};

const getReaction = async (req, res) => {
    const reaction = await Reaction.findById(req.params.id);
    if (!reaction) return res.status(404).send('The reaction with the given ID was not found');
    res.send(reaction);
};

const addReaction = async (req, res) => {
    const {error} = validateReaction(req.body);
    if (error) return res.status(403).send(error.details[0].message);
    let user = await User.findById(req.body.user_id);
    if(!user){
        return res.status(404).send('User with the given Id does not exist');
    }
    let post = await Post.findById(req.body.post_id);
    if(!post) return res.status(404).send('Post with the given Id does not exist')

    // let reaction = await Reaction.findOne({reaction_type: req.body.reaction_type});
    // if (reaction) return res.status(403).status('Reaction already exists');
    if (req.body.reaction_type === 'Like' || req.body.reaction_type === 'Love' || req.body.reaction_type === 'Funny') {
        let reaction = new Reaction({
            reaction_type: req.body.reaction_type,
            post_id: req.body.post_id,
            user_id: req.body.user_id,
        });

        await reaction.save();
        res.send(reaction);
    } else {
        return res.status(403).send('Reaction type can be Like, Love or Funny');
    }

};

const updateReaction = async (req, res) => {
    const {error} = validateUpdateReaction(req.body);
    if (error) return res.status(403).send(error.details[0].message);
    if (req.body.reaction_type === 'Like' || req.body.reaction_type === 'Love' || req.body.reaction_type === 'Funny') {
        let reaction = await Reaction.findByIdAndUpdate(req.params.id, {reaction_type: req.body.reaction_type}, {
            new: true
        });
        if (!reaction) return res.status(404).send('The reaction with the given ID was not found');
        res.send(reaction);
    }
    return res.status(403).send('Reaction type can be only updated as Like, Heart or Funny')
};

const deleteReaction = async (req, res) => {
    const reaction = await Reaction.findByIdAndRemove(req.params.id);
    if (!reaction) return res.status(404).send('The reaction with the given ID does not exist');
    res.send(reaction);
};

const deleteReactions = async (req, res) => {
    const reactions = await Reaction.deleteMany();
    res.send('Deleted ' + reactions.deletedCount + ' documents');
};

module.exports = {
    getReaction,
    getReactions,
    addReaction,
    updateReaction,
    deleteReaction,
    deleteReactions
}
