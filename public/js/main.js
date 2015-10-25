var app = angular.module("MyApp", []);

var buildMsg = function(date, status, body){
    var options = {
        weekday: "long", year: "numeric", month: "numeric",
        day: "numeric", hour: "2-digit", minute: "2-digit"
    };
    // 1/1/2013 20:00-22:00: Good: Battlestation fully operational
    r = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()
        + " " + date.getHours()
        + ":" + date.getMinutes()
        + ": " + status
        + ": " + body;
    return r;
};

app.controller("MsgCont", function($scope, $http) {

    $http.get('/api/status').
        success(function(data, status, headers, config) {
            msgs = [];
            for(i in data.messages){
                msg = data.messages[i];
                msgs.push(
                    buildMsg(new Date(msg["created_on"]), msg["status"], msg["body"])
                )
            }
            $scope.msgs = msgs;

            console.log(msgs);
        }).
        error(function(data, status, headers, config) {
            //console.log(apiStatus);
        });
});
