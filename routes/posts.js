const express = require('express');
const router = express.Router();

const postsControllers = require('../controllers/posts_controllers');

router.get('/post',postsControllers.posts);

module.exports = router;