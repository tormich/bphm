var express = require('express');
var https = require('https');
var router = express.Router();


var lastRefresh = 0
    , apiUrls = null;


var getJson = function(host, path, ondata, onerror){
    var options = {
        hostname: host
        , port:  443
        , path: path
        , method: 'GET'
        , headers: {'Content-Type': 'application/json'}
    };

    var _req = https.request(options, function(_res) {
        console.log("statusCode: ", _res.statusCode);
        console.log("headers: ", _res.headers);

        _res.on('data', function(d) {
            console.log(d);
            ondata(d);
        });
    });
    _req.end();

    _req.on('error', function(e) {
        console.error(e);
        onerror(e);
    });
};

var Pipe = function(){
    return {
        queue: []
        , onerrorCallback: null

        , exec: function(onError){
            this.onerrorCallback = onError;
        }
        , next: function(prevResult){

        }
        , add: function (foo) {
            // pipelineFunction(prevResult, success, error)
            this.queue.push(foo);
        }
    };
}

var updateApiUrls = function(){};

/* GET apiStatus listing. */
router.get('/', function (req, res, next) {
    // https://status.github.com/api.json
    var pipe = new Pipe();
    pipe.add(updateApiUrls);

    if(apiUrls == null){
        getJson("status.github.com", "/api.json", "GET"
        , function(data){
                res.end(data);
            }
        , function(error){
                res.end("error", error);
            });
    }

});

module.exports = router;
