const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middleware/passport')(passport);
const commentController = require('../controllers/comments')

router.get('/', commentController.getComments);

router.get('/:id', commentController.getComment);

router.post('/', passport.authenticate("jwt", { session: false }), commentController.addComment);

router.put('/:id', passport.authenticate("jwt", { session: false }), commentController.updateComments);

router.delete('/:id', passport.authenticate("jwt", { session: false }), commentController.deleteComment)

router.delete('/', passport.authenticate("jwt", { session: false }), commentController.deleteComments)

module.exports = router;
