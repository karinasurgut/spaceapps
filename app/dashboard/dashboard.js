'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])
.controller('DashboardCtrl', ['$scope','$http', function($scope, $http) {
	$scope.score = 24;
	$scope.date = new Date();
	
	$scope.routine1={
		id: 1,
		title:"Situps",
		type:"Warmup",
		reps:4,
		duration:10,
		durationPeriod:'min',
		img:'triceps.png',
		muscles:'Triceps'
	};
	
	$scope.routine={
		1:{
		 	title:"Situps",
		 	type:"Warmup",
		 	reps:4,
		 	duration:10,
		 	durationPeriod:'min',
		 	img:'triceps.png',
		 	muscles:'Triceps'
		},
		2:{
			title:"Situps",
		 	type:"Warmup",
		 	reps:4,
		 	duration:10,
		 	durationPeriod:'min',
		 	img:'triceps.png',
		 	muscles:'Triceps'
		}
	};
	
//var url = "http://localhost:8888/reveldeleteapi/public/api/v1";

// $http.get(url)
//   .success(function(data){
//     $scope.info = data;
//   })
//   .error(function(err){
//     return err;
//   });

}]);
