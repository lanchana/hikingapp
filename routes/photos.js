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
    // User.findOne({_id: req.params.userId}, (err, user) => {
    //     if(err)console.log(err);
    //    Places.findOne({_id: req.params.placesId}, (err, photo) => {
    //     if(err) console.log(err);
    //     res.json(photo);
    //    })

    // })

    //  User.findById(req.params.userId)
    // .exec((err, user) => {
    //     if(err) console.log(err);
    //     console.log(user.places.photos);
    //     console.log("placesPhotos" + places);
    //     // user.list.findById(req.params.placesId)
    //     // .exec((err, places) => {
    //         // if(err) console.log(err);
    //         console.log("photos"+req.params.userId);
    //         res.render('photos/edit', {
    //             places: places,
    //             userId: req.params.userId,
    //             placesId: req.params.placesId
    //         });
    //     // })
    // });
})

router.post('/', (req, res) => {

    User.findOne({_id: req.params.userId}, function(err, data) {
        if (err) { res.json(false) }
        else {
            for (var i = 0; i < data.places.length; i++) {
                if(data.places[i]._id == req.params.placesId) {
                    data.places[i].photos.push({name: req.body.name, photo_url: req.body.photoUrl });                          }
                }
                User.update({_id: req.params.userId}, data, function(err, status) {
                if (err) { console.log('Error updating whole topic'); res.json(false) }
                else {
                    User.findOne({_id: req.params.userId}, function(err, data) {
                        if (err) {
                            console.log('Error finding comments');
                            res.json(status);
                        } else {
                            console.log('Success getting comments');
                            // res.json(data);
                            res.redirect('/'+req.params.userId);
                        }
                    })
                }
            });
            }
        });
})

router.delete('/:id', (req, res) => {

//     User.update(
//   { _id : "58d6a004215287e1096173bb" },
//   {$pull : {"places.0.photos" : {"name":"summit"}}}
// )

//     User.update(
//     {'_id': req.params.userId},
//     {'places._id': req.params.placesId },
//     { $pull: { "photos" : { id: req.params.id } } },
// false,
// true
// );

// User.update(
//   {'user.places._id': ObjectId(req.params.placesId)},
//   {$pull: {'.$.assets': {'_id': ObjectId('4fc63def5b20fb722900010e')}}}
// )


    // User.update({'_id': req.params.userId},
    //     {$unset: {'places.'+req.params.pacesId+'.photos': ""}})

//     User.update(
//   {
//     "_id" : req.params.userId,
//     "places.id" : req.params.placesId,
//     "places.photos.id" : req.params.id },
//   {
//     $pull : { photos: {_id: req.params.id} }
//   },
//   false,
//   true
// )


// User.findByIdAndUpdate(req.params.userId, {
//     places
//         $pull: {
//             list: {_id: req.params.id}
//         }
//     })
//     .exec((err, del) => {
//         if(err) console.log(err);
//         res.redirect('/users/'+req.params.userId);
//     })



// User.update(
//   { _id : req.params.userId },
//   {$pull : {"places.$.photos" : {_id:req.params.id}}}
// )


    // User.findByIdAndUpdate(req.params.userId, (err, data) => {
    //     console.log(data);
    //     $pull: {
    //         photos: {_id: req.params.id}
    //     }
    // })
    // .exec((err, del) => {
    //     if(err) console.log(err);
    //     console.log('deleted'+ del);
    //     res.redirect('/users/'+req.params.userId);
    // })
    // User.findByIdAndUpdate(req.params.userId, {
    //    User.findOne({_id: req.params.userId}, function(err, data) {
    //     if (err) { res.json(false) }
    //     else {
    //         for (var i = 0; i < data.places.length; i++) {
    //             if(data.places[i]._id == req.params.placesId) {
    //                 data.places[i].photos.forEach(function(p) {
    //                     if(p._id == req.params.id){
    //                     console.log("photooos"+p);
    //                     $pull: {
    //                         photos: {_id: req.params.id}
    //                     }
    //                 }
    //                 })
    //             }


    //         }
    //     }});
       // User.update({_id: req.params.userId}, (err) => {
       //  if(err) console.log(err);
       //  console.log('Phot Updated');
       // })

       // User.update{_id: req.params.userId, photos._id: req.params.placesId}, {$pull: {"places.0.photos": {_id: req.params.id}}};
})

module.exports = router;