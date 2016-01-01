var express = require('express');
var router = express.Router();
var Helper = require(__base + 'utilities/helper');


/* GET home page. */
router.get('/:page*?', function (req, res) {
    //Let's clean up the config from cache and require it agian just in anything has changed
    delete require.cache[require.resolve(__base + 'data/config.json')];
    var config = require(__base + 'data/config.json');
    
    
    // var menus = require('../data/'+ config.preview_theme+'/menus.json');
    //var pages = require('../data/' + config.preview_theme + '/pages.json');
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    
    var c_page = "";
    if (req.params.page) {
        c_page = req.params.page;
    } else {
        c_page = "home";
    }
    // page = pages[c_page];
    
    
    // Get menus
    var menus = Helper.GetMenus();
    //dataAccess.GetByName(config.preview_theme, function (err, menuResponse) {
    
    //    if (menuResponse.success) {
    //        menus = menuResponse.extras.items;
    //    } else {
    
    //    }
    
    //  Declare 404 error to be used if page is not found
    var page = { title: '' };
    var four04 = { title: '404', content: "Page not found, try a search instead." };
    four04.app_info = config.app_info;
    four04.left_menu = menus;
    
    // Get page
    dataAccess.GetByName(c_page, function (err, response) {
        if (response.success) {
            page = response.extras;
            // setCurrentMenu(menus, c_page);
            
            page.app_info = config.app_info;
            page.left_menu = menus;
            res.render(config.preview_theme + '/index', page);
        } else {
            res.status(404).render(config.preview_theme + '/index', four04);
        }
    }, 'articles');
  //  }, 'menus');

    
});


function setCurrentMenu(menus, c_page) {
    for (var i = 0; i < menus.length; i++) {
        var item = menus[i];
        if (item.submenu) {
            item.is_parent = true;
            setCurrentMenu(item, c_page);
        } else {
            item.is_parent = false;
            var str = item.href.replace(/\//g, "");
            if (str == c_page) {
                item.is_current_page = true;
                break;
            } else {
                item.is_current_page = false;
            }
        }
    }
}

module.exports = router;