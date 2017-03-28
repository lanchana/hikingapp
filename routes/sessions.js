var express = require('express');
var router =  express.Router();
var User = require('../models/user.js');
var authHelper = require('../helpers/auth.js');

router.get('/login', (req, res) => {
    // console.log('im here');
    res.render('users/login');
});

router.post('/login', authHelper.loginUser, (req, res) => {
    console.log("Sessions" + req.session.currentUser._id)
    res.redirect('/' + req.session.currentUser._id);
});

router.delete('/', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});

module.exports = router;