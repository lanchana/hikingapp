const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose').set('debug', true);
const Places = require('../models/places.js');
const User = require('../models/user.js');
const authHelper = require('../helpers/auth.js');

// This router is called when user wants a add new places
router.get('/new', (req, res) => {
    console.log(req.params.userId);
    // It finds the user based on userId
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        // It will sends all the information about current user
        res.render('places/new', {
            user: user
        });
    });
});

// Its shows the information of particulat place based on its id
router.get('/:id/show', (req, res) => {
    // finds particular user based on userId
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        // assigns all the information of particular place to the places
        const places = user.places.id(req.params.id);
        // It gets the places show file
        res.render('places/show', {
            places: places,
            user: req.params.userId
        });
    });
});

router.get('/:id/galary', (req, res) => {
    // finds particular user based on userId
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        // assigns all the information of particular place to the places
        const places = user.places.id(req.params.id);
        // It gets the places show file
        res.render('galary/place', {
            places: places,
            user: req.params.userId
        });
    });
});

// This router is called when user wants to edit the places info
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        // Gets the specific places basded on id, and send the information to edit
        const places = user.places.id(req.params.id);
        res.render('places/edit', {
            places: places,
            user: req.params.userId
        });
    });
});

// This will be called to update place information after edit
router.put('/:id', (req, res) => {
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        console.log(req.body.url);
        // It finds the specific place baded on id, and updates the information
        const placeList = user.places.id(req.params.id);
        placeList.name = req.body.name,
        placeList.longitude = req.body.longitude,
        placeList.latitude = req.body.latitude,
        placeList.state = req.body.state,
        placeList.country = req.body.country,
        placeList.description = req.body.description,
        placeList.place_url = req.body.url
        // This will save the changes
        user.save();
        console.log('updated');
        // After updatind you will be redirected to the previous page
        res.redirect('/'+req.params.userId);
    })
});

// This will be called when user clicks on delete button
router.delete('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.userId, {
        // This is delete the specific place info based on its id
        $pull: {
            places: {_id: req.params.id}
        }
    })
    .exec((err, deleted) => {
        if(err) console.log(err);
        // After deleting successfully, you will redirect to the current page you are
        res.redirect('/'+req.params.userId);
    })
})

// This will called to add new place info to database for the specific user based on their id
router.post('/', (req, res) => {
    User.findById(req.params.userId)
    .exec((err, user) => {
        if(err) console.log(err);
        var newplace = new Places ({
            name: req.body.name,
            longitude: req.body.longitude,
            latitude: req.body.latitude,
            state: req.body.state,
            country: req.body.country,
            description: req.body.description,
            place_url: req.body.url
        });
        // Pushes the new place info to database
        user.places.push(newplace);
        // Saves the changes after adding new place info
        user.save((err) => {
            if(err) console.log(err);
            console.log('Place is added');
        });
        // After successfully adding new info you will be redirected to the previous page
        res.redirect('/'+req.params.userId);
    })
})

module.exports = router;
