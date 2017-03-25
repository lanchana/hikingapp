var express = require('express');
var router =  express.Router();
var User = require('../models/user.js');
var authHelper = require('../helpers/auth.js');

router.get('/login', (req, res) => {
    res.render('users/login');
});

router.post('/login', authHelper.loginUser, (req, res) => {
    res.redirect('/' + req.session.currentUser._id);
});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/users');
    });
});

module.exports = router;