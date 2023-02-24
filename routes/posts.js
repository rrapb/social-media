const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../middleware/passport')(passport);
const postController = require('../controllers/posts');


router.get('', passport.authenticate("jwt", { session: false }), postController.getPosts);

router.delete('/:id', passport.authenticate("jwt", { session: false }), postController.deletePost);

router.delete('', passport.authenticate("jwt", { session: false }), postController.deletePosts);

router.post('', passport.authenticate("jwt", { session: false }), postController.addPost);

router.put('/:id', passport.authenticate('jwt', { session: false }), postController.updatePost);

module.exports = router;