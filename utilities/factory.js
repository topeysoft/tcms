/** user.js **/

var schemas = require(__base + 'utilities/schemas');
var _ = require("lodash");
var Factory = function () { };

Factory.Get = function (data, modelName) {
    data = data || {};
    var schema = schemas[modelName];
    return _.pick(_.defaults(data, schema), _.keys(schema));
}

Factory.GetMany = function (dataArray, modelName) {
    var allData = [];
    var schema =  schemas[modelName];
    for (var i = 0; i < dataArray.length; i++) {
        data = dataArray[i] || {};
        
        allData.push(_.pick(_.defaultsDeep(data, schema), _.keys(schema)));
    }
    return allData;
    
}

module.exports = Factory;