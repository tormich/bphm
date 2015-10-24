var app = angular.module("MyApp", []);

app.controller("PostsCtrl", function($scope, $http) {

    $http.get('/api/status').
        success(function(data, status, headers, config) {
            $scope.posts = data;
            console.log(data);
        }).
        error(function(data, status, headers, config) {
            //console.log(apiStatus);
        });
});
