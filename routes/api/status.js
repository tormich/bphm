var express = require('express');
var https = require('https');
var pipeline = require('node-pipeline');

var router = express.Router();

const GH_HOST = "status.github.com";
var lastRefresh = 0
    , apiUrls = null
    , ghStatus = ""
    , ghMsgs = [];


var getJson = function(host, path, ondata, onerror){
    var options = {
        hostname: host
        , port:  443
        , path: path
        , method: 'GET'
        , headers: {'Content-Type': 'application/json'}
    };
    var onData = ondata;
    var onError = onerror;

    var _req = https.request(options, function(_res) {
        _res.on('data', (function(d) {
            onData(JSON.parse(d));
        }).bind(this));
    });
    _req.end();

    _req.on('error', (function(e) {
        console.error(e);
        onError(e);
    }).bind(this));
};


/* GET apiStatus listing. */
router.get('/', function (req, res, next) {
    var pl = pipeline.create("Tax and Gratuity Calculator");
    pl.on('end', function(err, results) {
        if (err) {
            console.log('Error in pipeline: ' + err);
            res.end(JSON.stringify({"error": {"message": 'Error in pipeline: ' + err}}));
        }

        res.end(JSON.stringify({"messages": ghMsgs, "status": ghStatus}));
    });

    if(apiUrls == null) {
        pl.use(function (result, next) {
            getJson(GH_HOST, "/api.json"
                , function(data){
                    console.log(data);
                    apiUrls = data;
                    next();
                }
                , function(error){
                    res.end(JSON.stringify({"error": {"message": error}}));
                });
        });
    }

    if(lastRefresh < (new Date().getTime() - 3600000)) { // one hour
        pl.use(function (result, next) {
            getJson(GH_HOST, apiUrls["status_url"].replace("https://", "").replace(GH_HOST, "")
                , (function(data){
                    ghStatus = data;
                    console.log(data);
                    next();
                }).bind(this)
                , (function(){
                    res.end(JSON.stringify({"error": {"message": error}}));
                }).bind(this));
            console.log("1");

        });

        pl.use(function(result, next){
            getJson(GH_HOST, apiUrls["messages_url"].replace("https://", "").replace(GH_HOST, "")
                , (function(data){
                    ghMsgs = data;
                    console.log(data);
                    next();
                }).bind(this)
                , (function(){
                    res.end(JSON.stringify({"error": {"message": error}}));
                }).bind(this));
            console.log("2");

        });
    }
    //pipe.add(updateApiUrls);
    //pipe.add(getStatu);
    //pipe.add(getMessages);
    console.log(lastRefresh);
    pl.execute();



});

module.exports = router;
