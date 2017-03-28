var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.js');

function createSecure(req, res, next) {
    var password = req.body.password;

    res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    next();
}

function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email})
    .then((foundUser) => {
        if(foundUser == null) {
            res.redirect('/');
        } else if(bcrypt.compareSync(password, foundUser.password)) {
            req.session.currentUser = foundUser;
        } else {
            res.redirect('/');
        }
        next();
    })
    .catch((err) => {
        res.json({status: 500, data: err});
    });
}

function authorized(req, res, next) {
    var currentUser = req.session.currentUser;
    if(!currentUser || currentUser._id != req.params.id) {
        res.json({status: 404, data: "Opps.. you are accessing a wrong page"});
    } else {
        next()
    }
};

module.exports = {
    createSecure: createSecure,
    loginUser: loginUser,
    authorized: authorized
};