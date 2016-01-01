var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');

var articleSchema = new Schema({
    path:String,
    title: String,
    content: String,
    excerpt:String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
    name : { type: String, required: true, trim: true, unique:true }
    , created_at    : { type: Date, default:Date.now}
    , updated_at    : { type: Date }
    

});


articleSchema.pre('save', function (next) {
    if (this.name) this.name = _.snakeCase(this.name);
    if (!this.path || _.trim(this.path) == "") this.path = this.name;
    
    try {
        if (!this.excerpt || _.trim(this.excerpt) == "") this.excerpt = _.trunc(this.content.replace(/(<.*?>)/g, ""), 120);
    } catch (e) { };

    var d = new Date();
    
    this.updated_at = d;
    next();
});

var Article = mongoose.model('Article', articleSchema);

exports.articles = Article;