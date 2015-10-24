var express = require('express');
var https = require('https');
var router = express.Router();

/* GET apiStatus listing. */
router.get('/', function (req, res, next) {
    // https://status.github.com/api.json

    var options = {
        hostname: 'status.github.com'
        , port:  443
        , path: '/api.json'
        , method: 'GET'
        , headers: {'Content-Type': 'application/json'}
    };

    var _req = https.request(options, function(_res) {
        console.log("statusCode: ", _res.statusCode);
        console.log("headers: ", _res.headers);

        _res.on('data', function(d) {
            //process.stdout.write(d);
            res.end(d);
        });
    });
    _req.end();

    _req.on('error', function(e) {
        console.error(e);
    });
});

module.exports = router;
