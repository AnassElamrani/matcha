const userController = require('../controllers/user');
const validator = require('../controllers/validator');
const authVrfy = require('../middleware/autMiddleware')
const jwt = require('jsonwebtoken');

const express = require('express');
const route = express.Router();
const passport = require('passport');

// Images ***************************************************
// add package multer to upload image
// const multer  = require('multer')
// multer destination folder
// const upload = multer({ dest: '../public/uploads/' })
//**********************************************************

// get signUp
route.get('/users/signup'); // .....

//  post signUp
route.post('/users/signup', validator.validationInput, userController.signUp);

//  post login
route.post('/users/login' , validator.validationInput, userController.postLogin);

//  post Send Forget Password
route.post('/users/sendForget', validator.validationInput, userController.sendForget);

//  post forget password
route.post('/users/forget/:vkey', validator.validationInput, userController.forgetPassword);

// get confirm account

route.get('/users/confirm/:vkey', userController.confirmUser);

//, upload.single('img') helper images

// post logout button

route.post('/logout', userController.logout);

// check if loggin

route.get('/users/checkLogin', authVrfy.requireAuth);

// oAuth
// Google
route.get('/auth/google', userController.google);

route.get('/auth/google/callback',  passport.authenticate('google', { failureRedirect: '/error' }), userController.googleCallback);
// Faacebook
route.get('/auth/facebook', userController.facebook);
route.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/error' }), userController.facebookCallback);
//42
route.get('/auth/42', userController.intra);
route.get('/auth/42/callback', passport.authenticate('42', { failureRedirect: '/error' }), userController.intraCallback);


module.exports = route;