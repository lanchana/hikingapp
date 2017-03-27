const express = require('express');
const router = express.Router({mergeParams: true});
const mongoose = require('mongoose');
const Photos = require('../models/photos');
const Places = require('../models/places');
const User = require('../models/user');
const authHelper = require('../helpers/auth');

router.get('/new', (req, res) => {
    Places.findById(req.params.placesId)
    .exec((err, places) => {
        if(err) console.log(err);
        // user.list.findById(req.params.placesId)
        // .exec((err, places) => {
            // if(err) console.log(err);
            console.log("photos"+req.params.userId);
            res.render('photos/new', {
                places: places,
                userId: req.params.userId,
                placesId: req.params.placesId
            });
        // })
    });
});

router.get('/edit', (req, res) => {

    console.log(req.params.userId);
    console.log(req.params.placesId);

    User.findOne({_id: req.params.userId}, function(err, data) {
        if (err) { res.json(false) }
        else {
            for (var i = 0; i < data.places.length; i++) {
                if(data.places[i]._id == req.params.placesId) {
                    console.log(data.places[i].photos);
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

router.post('/', (req, res) => {

    User.findById(req.params.userId)
    .exec((err, user) => {
        var place = user.places.id(req.params.placesId)
        place.photos.push({name: req.body.name, photo_url: req.body.photoUrl })
        user.save();
        res.redirect('/'+req.params.userId);
    });


})

router.delete('/:id', (req, res) => {
    User.findById(req.params.userId)
    .exec((err, user) => {
        var place = user.places.id(req.params.placesId)
        place.photos.pull(req.params.id)
        user.save();
        res.redirect('/userId//edit')
    });
});


module.exports = router;