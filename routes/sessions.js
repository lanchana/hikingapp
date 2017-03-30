var express = require('express');
var router =  express.Router();
var User = require('../models/user.js');
var authHelper = require('../helpers/auth.js');

// This will renders the login page
router.get('/login', (req, res) => {
    res.render('users/login', {
        error: req.query.error
    });
});

// the check the user cradentials in auth.js file and if it validated
// right then its gonna get current user id and redirect to main page
router.post('/login', authHelper.loginUser, (req, res) => {
    if (req.error) {
        res.redirect('/sessions/login?error=' + req.error);
    }
    else {
        res.redirect('/' + req.session.currentUser._id + '?error=' + req.error);
    }
});

// This will kill the user session when they logout
router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;