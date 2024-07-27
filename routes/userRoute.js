const express = require('express');
const User = require('../models/user');
const wrapAsynch = require('../utility/wrapAsynch.js');
const passport = require('passport');
const Router = express.Router();

// middleware 
const { saveRedirectURl } = require('../middleware.js');
const userController = require('../controller/user.js');

Router.route('/signup')
    .get(userController.signupRender)
    .post(wrapAsynch(userController.singupRequest))

Router.route('/login').get(userController.loginRender)
    .post(saveRedirectURl, passport.authenticate('local', {
        failureRedirect: '/login',
        failureFlash: true
    }), userController.loginRequest);


Router.get('/logout', userController.logoutRequest)




module.exports = Router;