const express = require('express');

const router = express.Router();

const homeControllers = require('../controllers/home_controllers');


console.log('Router is loaded');

router.get('/',homeControllers.home);

router.use('/users',require('./users'));

//for any further routes, access from here
//router.use('/NameofRoutes',requires('./routerFile'));

module.exports =router;
