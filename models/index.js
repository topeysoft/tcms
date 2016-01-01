var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var _ = require('lodash');

//mongoose.connect('mongodb://71.51.203.72:27017/app', function (err) {
//    //mongoose.connect('mongodb://192.168.1.104:27017/app', function (err) {
//    //mongoose.connect('mongodb://127.0.0.1:27017/app', function (err) {
//    if (err) {
//        console.log('connection error', err);
//    } else {
//        console.log('connection successful');
//    }
//});
var model = {}

fs.readdirSync(__dirname)
    .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
})
    .forEach(function (file) {
    model = _.extend(model, require(path.join(__dirname, file)));
});

module.exports = model;