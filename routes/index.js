const express = require('express');

const router = express.Router();

const homeControllers = require('../controllers/home_controllers');


console.log('Router is loaded');

router.get('/',homeControllers.home);

router.use('/users',require('./users'));

router.use('/posts',require('./posts'));

router.use('/comments',require('./comments'));

//for any further routes, access from here
//router.use('/NameofRoutes',requires('./routerFile'));

module.exports =router;
