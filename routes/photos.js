const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const Places = require('../models/places');
const User = require('../models/user');
const authHelper = require('../helpers/auth');

// This will be called wnen you want to add new photos to specific hiking place
router.get('/new', (req, res) => {
    // Finds the specific place based on placesId
    Places.findById(req.params.placesId)
    .exec((err, places) => {
        if(err) console.log(err);
        // gets the photos new page and passes all the info about particulat place, userId, and placeId
        res.render('photos/new', {
            places: places,
            userId: req.params.userId,
            placesId: req.params.placesId
        });
    });
});

// This will be accessed when you call photos edit page
router.get('/edit', (req, res) => {
    // finds the specific user based on userId
    User.findOne({_id: req.params.userId}, function(err, data) {
        if (err) { res.json(false) }
        else {
            // goes through all the places in that specsific user
            for (var i = 0; i < data.places.length; i++) {
                // when the placesId match found in that places data, it will redirect to places edit file
                if(data.places[i]._id == req.params.placesId) {
                    // sends the all the phots in that particulat place, alond with current userId and placesId
                    res.render('photos/edit', {
                        photos: data.places[i].photos,
                        userId: req.params.userId,
                        placesId: req.params.placesId
                    });
                }
            }
        }
    });
})

// This will be called to add new photos to a specific place
router.post('/', (req, res) => {
    // Finds specific user and place based on userId and placesID
    User.findById(req.params.userId)
    .exec((err, user) => {
        // When the math found adds the new photo name and url to database
        var place = user.places.id(req.params.placesId)
        place.photos.push({name: req.body.name, photo_url: req.body.photoUrl })
        // Saves the changes
        user.save();
        // and then redirects into the same page to add more photos
        res.redirect('/'+req.params.userId+'/'+req.params.placesId+'/photos/new');
    });


})

// This will be called to delete photos for specific place
router.delete('/:id', (req, res) => {
    // Finds specific user and place based on userId and placesID
    User.findById(req.params.userId)
    .exec((err, user) => {
        var place = user.places.id(req.params.placesId)
        // Deletes the specific photo based on its id
        place.photos.pull(req.params.id)
        // Saves the changes made into database
        user.save();
        // Redirects to the same page to delete more photos
        res.redirect('/'+req.params.userId+'/'+req.params.placesId+'/photos/edit')
    });
});


module.exports = router;