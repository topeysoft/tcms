var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var _ = require('lodash');
var menuSchema = new Schema({
    //name: String,
    items: [],
    name : { type: String, required: true, trim: true, unique:true }
    , created_at    : { type: Date, default:Date.now}
    , updated_at    : { type: Date }
    

});


menuSchema.pre('save', function (next) {
    now = new Date();
    this.name = _.snakeCase(this.name);
    this.updated_at = now;
    next();
});

var Menu = mongoose.model('Menu', menuSchema);

exports.menus = Menu;