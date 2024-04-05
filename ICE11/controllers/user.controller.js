const { response } = require("express");
const bcrypt = require('bcrypt');
const { model } = require("mongoose")

const { User } = require("../models/user");
const saltRounds = 12;

/**
 * search database to see if username exists
 * @param {*} usernameToFind 
 * @returns 
 */
function userExists(usernameToFind) {
    return User.findOne({ username: usernameToFind })
        .then(function (user) {
            return user;
        }).catch((err) => {
            return null;
        });
};

/**
 * renders home view
 * @param {*} req 
 * @param {*} res 
 */
exports.homeView = (req, res) => {
    res.render('home', {
        pageTitle: 'INFT 2202 - Home Page',
    })
}

/**
 * render the login page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getLogin = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        errorMessage: ''
    });
}

/**
 * render the login failure page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getLoginFailure = (req, res, next) => {
    res.render('login', {
        pageTitle: 'Login',
        errorMessage: 'Username/password combination does not exist. Please try again.'
    });
}

/**
 * render the login success page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getLoginSuccess = (req, res, next) => {
   res.render('login-success', {
        pageTitle: '',
        user: { username: req.body.username }
    });
}

/**
 * handle login form submit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postLogin = (req, res) => {
    let usernameEntry = req.body.username;
    let passwordEntry = req.body.password;
    // check to see if user pass combo exists
    // render either login-failure or login-success
    // check against DB instead of hardcoded values
    User.findOne({username: usernameEntry}).then(function(user){
        console.log(usernameEntry)
        if(user){
            bcrypt.compare(passwordEntry, user.hashPassword, function(err, result){
                if (err == null && result) {
                    getLoginSuccess(req, res);
                }
                else {
                    getLoginFailure(req, res);
                }
            })
        }
        else {
            getLoginFailure(req, res);
        }
    });
};


/**
 * render the register page
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getRegister = (req, res, next) => {
    res.render('register', {
        pageTitle: 'Register a New Account',
        errorMessage: ''
    });
}

/**
 * handle register form submit
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRegister = (req, res) => {
    let usernameEntry = req.body.username?.trim();
    let passwordEntry = req.body.password?.trim();
    let errorMessage = '';
    User.findOne({username: usernameEntry}).then(function(user){
        if (user) {
            res.render('register', {
                pageTitle: 'Register a New Account',
                errorMessage: 'Username is already in use. Please choose another.'
            }) ;
        }
        else{
            // hash password before adding
            bcrypt.hash(passwordEntry, saltRounds, function(err, hash){
                if (err == null && hash){
                    //hash successful

                    // create user object
                    let userData = {
                        username: usernameEntry,
                        hashPassword: hash
                    }

                    let newUser = new User(userData);
                    newUser.save();
                    res.render('login', {
                        pageTitle: 'Login',
                        errorMessage: ''
                    }) ;

                } else {
                    console.log(err)
                }
            });
        }
    })
    .catch((err) => {
        console.log ('An error occured', err)
    });
}



module.exports = exports;
