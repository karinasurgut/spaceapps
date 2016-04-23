'use strict';

angular.module('myApp.home', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'home/home.html',
    controller: 'HomeCtrl'
  });
}])
.controller('HomeCtrl', ['$scope','$http', function($scope, $http) {
//var url = "http://localhost:8888/reveldeleteapi/public/api/v1";

// $http.get(url)
//   .success(function(data){
//     $scope.info = data;
//   })
//   .error(function(err){
//     return err;
//   });

}]);
