var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var authorSchema = new Schema({
    suffix: String,
    email: String,
    occupation: String,
    archivements:[],
    first_name: String
    , last_name: String
    , created_at    : { type: Date, default:Date.now}
    , updated_at    : { type: Date }
    

});


authorSchema.pre('save', function (next) {
    now = new Date();
    this.updated_at = now;
    next();
});

var Author = mongoose.model('Author', authorSchema);

exports.authors = Author;