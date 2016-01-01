
var DataObject = function () {
    
    //this.crypto = require('crypto');
    //this.uuid = require('node-uuid');
    this.ApiResponse = require(__base + 'utilities/api-response.js');
    this.ApiMessages = require(__base + 'utilities/api-messages.js');
    // this.UserProfileModel = require('../models/user-profile.js');
    this.Model = require(__base + 'models');
    //this.Role = require('../models/roles.js');
    //this.Template = require('../models/templates.js');
    //this.LINQ = require('node-linq').LINQ;
    this.mongoose = require('mongoose');
    this._ = require("lodash");
    //this.session = session;
    // this.mailer = mailer;
    this.Factory = require(__base + 'utilities/factory');
};


// DataObject
DataObject.prototype.GetMany = function (params, callback, modelName) {
    if (typeof (params) == "undefined") params = {};
    var me = this;
    me.Model[modelName].find(params, function (err, items) {
        if (err) {
            console.error("ERROR IN GET MANY "+ modelName+": ",err);
            
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (items && items.length > 0) {
            
            
            var itemArray = me.Factory.GetMany(items, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemArray }));

        } else {
            console.log("There was no role found for this query" + params);
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_FOUND }));
        }

    });
}

DataObject.prototype.GetOne = function (params, callback, modelName) {
    if (typeof (params) == "undefined") params = {};
    var me = this;
    me.Model[modelName].findOne(params, function (err, item) {
        if (err) {
            console.error(err);
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (item) {
            var itemProfile = me.Factory.Get(item, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));
        } else {
            
            // console.log("No roles found by by the name " + name);
            
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_FOUND }));
        }


    });
}

// Get a blank template for creating new object
DataObject.prototype.GetTemplate = function (presetProperties, callback, modelName) {
    if (typeof (presetProperties) == "undefined") presetProperties = {};
    var me = this;
    var itemProfile = me.Factory.Get(presetProperties, modelName);
    callback(null, new me.ApiResponse({ success: true, extras: itemProfile }));
}


DataObject.prototype.GetByName = function (name, callback, modelName) {
    var me = this;
    me.Model[modelName].findOne({ name: { $regex: new RegExp("^" + name + '$', "i") } }, function (err, item) {
        if (err) {
            console.error(err);
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (item) {
            var itemProfile = me.Factory.Get(item, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));
        } else {
            
            console.log("No item found by  the name " + name);
            
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_FOUND }));
        }

    });
}

DataObject.prototype.GetByEmail = function (email, callback, modelName) {
    var me = this;
    me.Model[modelName].findOne({ email: { $regex: new RegExp("^" + email + '$', "i") } }, function (err, item) {
        if (err) {
            console.error(err);
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (item) {
            var itemProfile = me.Factory.Get(item, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));
        } else {
            
            console.log("No user found with the email " + email);
            
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_FOUND }));
        }

    });
}


DataObject.prototype.GetById = function (id, callback, modelName) {
    var me = this;
    me.Model[modelName].findOne({ _id: id }, function (err, item) {
        if (err) {
            console.error(err);
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (item) {
            var itemProfile = me.Factory.Get(item, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));
        } else {
            
            console.log("No item found by  the id " + id);
            
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_FOUND }));
        }

    });
}

DataObject.prototype.Update = function (id, newItem, callback, modelName) {
    var me = this;
    if (typeof (newItem) == "string") newItem = JSON.parse(newItem);
    //console.log(newUser);
    //if (id != newItem.id) {
    //    return callback('', new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.INVALID_OPERATION } }));
    //}
    
    me.Model[modelName].findOne({ _id: id },

    function (err, updatedItem) {
        if (err) {
            console.error(err);
            
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (updatedItem) {
            me._.extend(updatedItem, newItem);
            updatedItem.save();
            updatedItem.updated_at = new Date();
            var itemProfile = me.Factory.Get(updatedItem, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemProfile}));
        } else {
            console.log("Could not update DataObject");
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_CHANGED }));
        }

    });
}

DataObject.prototype.DeleteById = function (id, callback, modelName) {
    var me = this;
    
    me.Model[modelName].findOneAndRemove({ _id: id },

    function (err, removedItem) {
        if (err) {
            console.error(err);
            
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (removedItem) {
            var item = me.Factory.Get(removedItem, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: { msg: me.ApiMessages.DELETED, item: item } }));
        } else {
            console.log("Could not delete item");
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_CHANGED }));
        }

    });
}
DataObject.prototype.DeleteMany = function (params, callback, modelName) {
    var me = this;
    
    me.Model[modelName].remove(params,

    function (err, removedItems) {
        if (err) {
            console.error(err);
            
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (removedItems) {
            var item = me.Factory.GetMany(removedItems, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: { msg: me.ApiMessages.DELETED, item: item } }));
        } else {
            console.log("Could not delete item");
            callback(err, new me.ApiResponse({ success: false, extras: me.ApiMessages.NOT_CHANGED }));
        }

    });
}
DataObject.prototype.Create = function (r, callback, modelName) {
    var me = this;
    if (typeof (r) == "string") r = JSON.parse(r);
    var newItem = new me.Model[modelName](r);
    
            
            newItem.save(function (err, item, numberAffected) {
                
                if (err) {
                    console.log(err);
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
                }
                
                if (numberAffected === 1) {
                    
                    var itemProfile = me.Factory.Get(item, modelName);
                    callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));

                } else {
                    return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE } }));
                }

            });
}


DataObject.prototype.CreateMany = function (r, callback, modelName) {
    var me = this;
    if (typeof (r) == "string") r = JSON.parse(r);

    me.Model[modelName].create(r, function (err, items) {
        if (err) {
            console.log(err);
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
        }
        
        if (items.length>0) {
            
            var itemsArray = me.Factory.GetMany(items, modelName);
            callback(err, new me.ApiResponse({ success: true, extras: itemsArray }));

        } else {
            return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE } }));
        }
    });

    //var newItem = new me.Model[modelName](r);
    
    
    //newItem.save(function (err, item, numberAffected) {
        
    //    if (err) {
    //        console.log(err);
    //        return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.DB_ERROR } }));
    //    }
        
    //    if (numberAffected === 1) {
            
    //        var itemProfile = me.Factory.Get(item, modelName);
    //        callback(err, new me.ApiResponse({ success: true, extras: itemProfile }));

    //    } else {
    //        return callback(err, new me.ApiResponse({ success: false, extras: { msg: me.ApiMessages.COULD_NOT_CREATE } }));
    //    }

    //});
}

// Must be called last the his file
module.exports = DataObject;
