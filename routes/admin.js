var express = require('express');
var router = express.Router();
var Factory = require(__base + 'utilities/factory');
var HttpStatus = require("httpstatuscode").httpStatusCode;
var ApiResp = new (require(__base + 'utilities/api-response'));
var ApiMsg = require(__base + 'utilities/api-messages');
var Helper = require(__base + 'utilities/helper');
var Authorize = require(__base + 'utilities/authorize');
var admin_theme = "cmsadmin";

/* GET and render page. */
router.get('/editable/:page*?', 
    Authorize({}, false),
    function (req, res) {
    
    //Let's clean up the config from cache and require it agian just in anything has changed
    delete require.cache[require.resolve(__base + 'data/config.json')];
    var config = require(__base + 'data/config.json');
    
    if (req.is_authorized) {
        
        
        
        // var menus = require('../data/'+ config.current_theme+'/menus.json');
        //var pages = require('../data/' + config.current_theme + '/pages.json');
        var dataAccess = new (require(__base + 'utilities/dal'));
        
        
        
        var c_page = "";
        if (req.params.page) {
            c_page = req.params.page;
        } else {
            c_page = "home";
        }
        // page = pages[c_page];
        
        // Get menus
        dataAccess.GetByName(config.current_theme, function (err, menuResponse) {
            var menus = [];
            if (menuResponse.success) {
                menus = menuResponse.extras.items;
            } else {

            }
            
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
                    res.render(config.current_theme + '/editable', page);
                } else {
                    res.render(config.current_theme + '/index', four04);
                }
            }, 'articles');
        }, 'menus');

    } else {
        var accessData = { title: 'Get Access', content: "You must be athenticated to access the requested page." };
        accessData.app_info = config.app_info;
        accessData.sign_up_url = req.baseUrl + "/register";
        //accessData.left_menu = menus;
        res.render(admin_theme + '/access', accessData);
    }
});

/* GET and render login page. */
router.get('/login', 
    function (req, res) {
    
    //Let's clean up the config from cache and require it agian just in anything has changed
    delete require.cache[require.resolve(__base + 'data/config.json')];
    var config = require(__base + 'data/config.json');
    
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    
    
    var accessData = { title: 'Access Management', content: "Let's see if you have access." };
    accessData.app_info = config.app_info;
    accessData.sign_up_url = req.baseUrl + "/register";
    accessData.view = 0; // set to 0 to login
    res.render(admin_theme + '/access', accessData);
});


/* GET and render login page. */
router.get('/register', 
    function (req, res) {
    
    //Let's clean up the config from cache and require it agian just in anything has changed
    delete require.cache[require.resolve(__base + 'data/config.json')];
    var config = require(__base + 'data/config.json');
    
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    
    
    var accessData = { title: 'Access Management', content: "Let's get started." };
    accessData.app_info = config.app_info;
    accessData.login_url = req.baseUrl + "/login";
    accessData.view = 1;  // Set to 1 to show register
    res.render(admin_theme + '/access', accessData);
});

/* GET admin home page. */
router.get('/:page*?', function (req, res) {
    //Let's clean up the config from cache and require it agian just in anything has changed
    delete require.cache[require.resolve(__base + 'data/config.json')];
    var config = require(__base + 'data/config.json');
    
    
    // var menus = require('../data/'+ config.current_theme+'/menus.json');
    //var pages = require('../data/' + config.current_theme + '/pages.json');
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
    //dataAccess.GetByName(config.current_theme, function (err, menuResponse) {
    
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
            res.render(admin_theme + '/index', page);
        } else {
            res.status(404).render(admin_theme + '/index', four04);
        }
    }, 'articles');
  //  }, 'menus');

    
});


module.exports = router;