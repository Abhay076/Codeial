const express = require('express');

const router = express.Router();
const passport = require('passport');
const postsControllers = require('../controllers/posts_controllers');

router.post('/create',passport.checkAuthentication,postsControllers.create);

module.exports = router;