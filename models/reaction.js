const mongoose = require('mongoose');
const Joi = require('joi');
const post_id = {type: mongoose.Schema.Types.ObjectId, ref: 'Post'}
const user_id = {type: mongoose.Schema.Types.ObjectId, ref: 'User'}

const reactionSchema = new mongoose.Schema({
    reaction_type: {
        type: String,
        required:false
    },
    post_id: post_id,

    user_id: user_id


});

const Reaction = mongoose.model('Reaction', reactionSchema);

function validateReaction(reaction) {
    const schema = Joi.object({
        reaction_type: Joi.string().required(),
        post_id: Joi.string().required(),
        user_id: Joi.string().required()
    })
    return schema.validate(reaction);
}
function validateUpdateReaction(reaction){
    const schema = Joi.object({
        reaction_type: Joi.string().min(3).required()
    })
    return schema.validate(reaction)
}

exports.Reaction = Reaction;
exports.reactionSchema = reactionSchema;
exports.validateReaction = validateReaction;
exports.validateUpdateReaction = validateUpdateReaction;