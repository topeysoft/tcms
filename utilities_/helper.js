var Models = require(__base + 'models');
var _ = require('lodash');

var Helper = function (){

}

Helper.GetAllModel = function (){
    return Models;
}

Helper.GetModel = function (modelName) {
    return Models[modelName];
}

Helper.GetMenus = function () {
    var menus = [
        {
            "text": "Dashboard",
            "href": "#/"
        }
    ];
    
    var menuKeys = Object.keys(Models);
    //console.log(menuKeys);
    for (var i = 0, len = menuKeys.length; i < len; i++) {
        var mkey = menuKeys[i];
        var mkey_lower = _.snakeCase(mkey);
        var menu = {
            text: _.startCase(mkey),
            href: "",
            submenu: [
                {
                    "text": "View all",
                    "href": "#/list/"+ mkey_lower
                },
                {
                    "text": "Add new",
                    "href": "#/create/"+ mkey_lower
                },

                {
                    "text": "View Drafts",
                    "href": "#/drafts/" + mkey_lower
                },
                {
                    "text": "View in trash",
                    "href": "#/trash/" + mkey_lower
                }
            ]
        };
        menus.push(menu);
    }
    return menus;
}
module.exports = Helper;