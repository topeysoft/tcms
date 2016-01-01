var express = require('express');
var router = express.Router();
var Factory = require(__base + 'utilities/factory');
var HttpStatus = require("httpstatuscode").httpStatusCode;
var ApiResp = new (require(__base + 'utilities/api-response'));
var ApiMsg = require(__base + 'utilities/api-messages');

// Setup  entry entry
router.post('/populate/:model', function (req, res) {
    if (req.params.model) {
        var dataAccess = new (require(__base + 'utilities/dal'));
        var default_data = require(__base + 'data/_default_' + req.params.model + '.json');
        // console.log("DAL:", dataAccess);
        function callback(err, data) {
            if (err) {
                res.status(HttpStatus.BadRequest).send(data);
            } else {
                if (!data.success) {
                    res.status(HttpStatus.BadRequest).send(data);
                } else {
                    res.status(HttpStatus.Created).send(data);
                }
            }
        
        }
        
        dataAccess.CreateMany(default_data, callback, req.params.model);
    } else {
        ApiResp.success = false;
        ApiResp.extras = { msg: ApiMsg.INVALID_OPERATION };
        res.status(HttpStatus.MethodNotAllowed).send(ApiResp);
    }
    
});



// Cleanup  entry
router.post('/cleanup/:model', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    // console.log("DAL:", dataAccess);
    function callback(err, data) {
        if (err) {
            res.status(HttpStatus.BadRequest).send(data);
        } else {
            if (!data.success) {
                res.status(HttpStatus.BadRequest).send(data);
            } else {
                res.status(HttpStatus.Created).send(data);
            }
        }
        
    }
    if (req.params.model) {
        dataAccess.DeleteMany({}, callback, req.params.model);
    } else {
        ApiResp.success = false;
        ApiResp.extras = { msg: ApiMsg.INVALID_OPERATION };
        res.status(HttpStatus.MethodNotAllowed).send(ApiResp);
    }
    
});

/* GET entry template. */
router.get('/templates/:model', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    // console.log("DAL:", dataAccess);
    var customRespType = req.headers["x-topeysoft-remove-success"];
    function callback(err, response) {
        var data = {};
        if (customRespType) {
            data = response.extras;
        } else {
            data = response;
        }
        if (err) {
            res.status(HttpStatus.NotFound).send(data);
        } else {
            if (!response.success) {
                res.status(HttpStatus.NotFound).send(data);
            } else {
                res.status(HttpStatus.OK).send(data);
            }
        }
        
    }
    if (req.params.model) {
            dataAccess.GetTemplate(req.body, callback, req.params.model);
    } else {
        res.render("api/index", { models: {} })
    }
    
});


/* GET entry. */
router.get('/:model/:id*?', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    // console.log("DAL:", dataAccess);
    var customRespType = req.headers["x-topeysoft-remove-success"];
    function callback(err, response) {
        var data = {};
        if (customRespType) {
            data = response.extras;
        } else {
            data = response;
        }
        if (err) {
            res.status(HttpStatus.NotFound).send(data);
        } else {
            if (!response.success) {
                res.status(HttpStatus.NotFound).send(data);
            } else {
                res.status(HttpStatus.OK).send(data);
            }
        }
        
    }
    if (req.params.model) {
        if (req.params.id) {
            dataAccess.GetOne({ _id: req.params.id }, callback, req.params.model);
        } else {
            dataAccess.GetMany({}, callback, req.params.model);
            //res.status(HttpStatus.NotFound).send(ApiResp);
        }
    } else {
        res.render("api/index", { models: {} })
    }
    
});


// Create new entry
router.post('/:model', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    var customRespType = req.headers["x-topeysoft-remove-success"];
   // console.log("DAL:", dataAccess);
    function callback(err, response) {
        var data = {};
        if (customRespType) {
            data = response.extras;
        } else {
            data = response;
        }
        if (err) {
                res.status(HttpStatus.BadRequest).send(data);
            } else {
                if (!response.success) {
                    res.status(HttpStatus.BadRequest).send(data);
                } else {
                    res.status(HttpStatus.Created).send(data);
                }
            }
        
    }
    if (req.params.model) {
            dataAccess.Create(req.body, callback, req.params.model);
    } else {
        ApiResp.success = false;
        ApiResp.extras = { msg: ApiMsg.INVALID_OPERATION };
            res.status(HttpStatus.MethodNotAllowed).send(ApiResp);
        }
    
});


// Update entry
router.put('/:model/:id', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    
    var customRespType = req.headers["x-topeysoft-remove-success"];
    // console.log("DAL:", dataAccess);
    function callback(err, response) {
        var data = {};
        if (customRespType) {
            data = response.extras;
        } else {
            data = response;
        }
        if (err) {
            res.status(HttpStatus.BadRequest).send(data);
        } else {
            if (!response.success) {
                res.status(HttpStatus.BadRequest).send(data);
            } else {
                res.status(HttpStatus.OK).send(data);
            }
        }
        
    }
    if (req.params.model && req.params.id) {
        dataAccess.Update(req.params.id, req.body, callback, req.params.model);
    } else {
        ApiResp.success = false;
        ApiResp.extras = { msg: ApiMsg.INVALID_OPERATION };
        res.status(HttpStatus.MethodNotAllowed).send(ApiResp);
    }
    
});

// Delete an entry
router.delete('/:model/:id', function (req, res) {
    var dataAccess = new (require(__base + 'utilities/dal'));
    
    
    var customRespType = req.headers["x-topeysoft-remove-success"];
    // console.log("DAL:", dataAccess);
    function callback(err, data) {
        var data = {};
        if (customRespType) {
            data = response.extras;
        } else {
            data = response;
        }
        if (err) {
            res.status(HttpStatus.BadRequest).send(data);
        } else {
            if (!response.success) {
                res.status(HttpStatus.BadRequest).send(data);
            } else {
                res.status(HttpStatus.Found).send(data);
            }
        }
        
    }
    if (req.params.model && req.params.id) {
        dataAccess.DeleteById(req.params.id,  callback, req.params.model);
    } else {
        ApiResp.success = false;
        ApiResp.extras = { msg: ApiMsg.INVALID_OPERATION };
        res.status(HttpStatus.MethodNotAllowed).send(ApiResp);
    }
    
});




module.exports = router;