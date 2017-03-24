var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.Promise = global.Promise;


var PhotosSchema = new Schema({
    name: String,
    photo_url: String
});

var PlacesSchema = new Schema({
    name: String,
    longitute: Number,
    lattitude: Number,
    state: String,
    country: String,
    description: String,
    photos: [PhotosSchema]
});

var UserSchema = new Schema({
    username: String,
    email: String,
    password: String,
    places: [PlacesSchema],
    created_at: Date,
    updated_at: Date
});

PhotosSchema.pre('save', (next) => {
    now = new Date();
    this.updated_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

PlacesSchema.pre('save', (next) => {
    now = new Date();
    this.updated_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

UserSchema.pre('save', (next) => {
    now = new Date();
    this.updated_at = now;

    if(!this.created_at) {this.created_at = now}
        next();
});

var UserModel = mongoose.model('User', UserSchema);

var PlacesModel = mongoose.model('Places', PlacesSchema);

var PhotosModel = mongoose.model('Photos', PlacesSchema);

module.exports = {
    User: UserModel,
    Places: PlacesModel,
    Photos: PhotosModel
};


