var bcrypt = require('bcrypt-nodejs');
var User = require('../models/user.js');

function createSecure(req, res, next) {
    var password = req.body.password;
    // It decript a hashed password and checks for the match
    res.hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
    next();
}

function loginUser(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({email: email})
    .then((foundUser) => {
        if(foundUser == null) {
            // When user gives the wrong email, it will redirect in to login page
            req.error = 'Invalid User Name';
        } else if(bcrypt.compareSync(password, foundUser.password)) {
            // if email id is coreect then this block cheks for password, if it finds the matchthen it retuns the founduser data
            req.session.currentUser = foundUser;
        } else {
            // if it doesnt find the right password then it will redirect to main page
            req.error = 'Invalid password'
        }
        next();
    })
    .catch((err) => {
        res.json({status: 500, data: err});
    });
}

// that checks if the CurrentUser's id matches the id in params your code here
function authorized(req, res, next) {
    var currentUser = req.session.currentUser;
    if(!currentUser || currentUser._id != req.params.id) {
        res.json({status: 404, data: "Opps.. you are accessing a wrong page"});
    } else {
        next()
    }
};

// Exports the below functions
module.exports = {
    createSecure: createSecure,
    loginUser: loginUser,
    authorized: authorized
};