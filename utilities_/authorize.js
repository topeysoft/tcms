var jwt = require('jsonwebtoken');
var dataAccess = new (require(__base + 'utilities/dal'));
var HttpStatus = require("httpstatuscode");
var HttpStatusCode = HttpStatus.httpStatusCode;
var authorize = function (options, enforce) {
    // Make sure we get an up-to-date configuration
    delete require.cache[require.resolve('../data/config.json')];
    var config = require(__base + 'data/config.json');

    if (enforce === undefined) enforce = true;
    
    
   return function (req, res, next) {
        if (options) { }
        
        function sendResponse(message, httpCode){
           // if (enforce === undefined) enforce = true;
            if (!message) message = "Unauthorized";
            if (!httpCode) httpCode = HttpStatusCode.Unauthorized;
            req.is_authorized = false;
            if (enforce) {
                res.status(httpCode).send(message);
            } else {
                next();
            }
        }
        
        
        
       var bearerToken;
       var bearerHeader = req.headers["authorization"];
       if (typeof bearerHeader !== 'undefined') {
           var bearer = bearerHeader.split(" ");
           bearerToken = bearer[1];
           req.token = bearerToken;
           jwt.verify(bearerToken, config.jwt_private_key, config.jwt_options, function (err, decoded) {
               if (err) {
                    sendResponse("Invalid access token.");
               } else {
                   var r = ""; 
                   req.decoded_token = decoded;
                   console.log("DECODED TOKEN: ", req.decoded_token);
                    // Get page
                    dataAccess.GetByEmail(decoded.user_profile.email, function auth_callback(err, obj) {
                            if (!err && obj && obj.success) {
                                var perms = {};
                                obj.extras.role.permissions.forEach(function (perm){
                                    perms["can_" + perm.name.toLowerCase()] = true;
                                    obj.extras["can_" + perm.name.toLowerCase()] = true;
                                })
                                obj.extras["is_" + obj.extras.role.name.toLowerCase()] = true;
                                req.current_user = obj.extras;
                            req.current_user.permissions = perms;
                            req.decoded_token.user_profile = req.current_user;
                            console.log("CURRENT_USER: ", req.current_user);
                            console.log("CURRENT_USER_PERMISSIONS: ", req.current_user.permissions);
                            req.is_authorized = true;
                            next();
                               
                        } else if (obj && obj.extras && obj.extras.code && obj.extras.code == 4) {
                            // Error occured but it's because author has not been registered.
                            // Let's register this author
                            dataAccess.Create(decoded.user_profile, auth_callback, "authors");
                        } else {
                            sendResponse("Autorization denied. Could not authenticate.");
                            //if (enforce) {
                            //    res.status(401).send("Unautorization denied. Could not authenticate.");
                            //} else {
                            //    next();
                            //}
                        }

                           
                       }, "authors");
                       
                          
                           
                  

               }
           });

        } else {
            sendResponse("Unautorized.");
       }
   }
}

module.exports = authorize;
