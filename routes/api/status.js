var express = require('express');
var https = require('https');
var router = express.Router();

/* GET apiStatus listing. */
router.get('/', function (req2, res, next) {
    // https://status.github.com/api.json

    var options = {
        hostname: 'status.github.com'
        , port:  443
        , path: '/api.json'
        , method: 'GET'
        , headers: {'Content-Type': 'application/json'}
    };

    var request = https.request(options, function (res) {
        res.setEncoding('utf8');
        res.on('data', function (data) {
            console.log(data); // I can't parse it because, it's a string. why?
        });
    });
    request.on('error', function (e) {
        console.log('problem with request: ' + e.message);
    });
    request.end("s");


});

module.exports = router;
