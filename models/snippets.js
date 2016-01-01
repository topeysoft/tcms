var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var SnippetSchema = new Schema({
    //title: String,
    content: String,
    name : { type: String, required: true, trim: true }
    , created_at    : { type: Date, default:Date.now}
    , updated_at    : { type: Date }
    

});


SnippetSchema.pre('save', function (next) {
    now = new Date();
    this.name = _.snakeCase(this.name);
    this.updated_at = now;
    next();
});

var Snippet = mongoose.model('Snippet', SnippetSchema);

exports.snippets = Snippet;