const express = require('express');
const router = express.Router();

const postsControllers = require('../controllers/posts_controllers');

router.get('/posts',postsControllers.posts);

module.exports = router;