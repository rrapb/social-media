const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middleware/passport')(passport);
const reactionController = require('../controllers/reactions');


router.get('/', reactionController.getReactions);

router.get('/:id', reactionController.getReaction);

router.post('/', passport.authenticate("jwt", { session: false }), reactionController.addReaction);

router.put('/:id', passport.authenticate("jwt", { session: false }), reactionController.updateReaction);

router.delete('/:id', passport.authenticate("jwt", { session: false }), reactionController.deleteReaction);

router.delete('/', passport.authenticate("jwt", { session: false }), reactionController.deleteReactions);

module.exports = router;
