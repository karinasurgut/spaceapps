'use strict';

angular.module('myApp.dashboard', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardCtrl'
  });
}])
.controller('DashboardCtrl', ['$scope','$http','$q', 'twitterService','$timeout','$interval', function($scope, $http, $q, twitterService,$timeout,$interval) {
	//$scope.score = 24;
	$scope.date = new Date();
	//$scope.countdown = 12;
	$scope.timeLeft = "";
	$scope.timerrunning = false;
	$scope.timerstarted= false;
	$scope.cheerMessage = "";

	$scope.mentionsNumber = 0;
	
	$scope.routine=[
		{
			id: 1,
			stage_id: 1,
			title:'Light walk',
			stage:'Warm-up',
			type: 'Cardio',
			duration_sec:60,
			img:'walk.png',
			muscles:'legs, back, core',
			equipment: 'Conan'
		},
		{
			id: 2,
			stage_id: 1,
			title:'Squats',
			stage:'Warm-up',
			type: 'Cardio',
			duration_sec:30,
			img:'squat.png',
			muscles:'legs and back',
			equipment: 'aRed'
		},
		{
			id: 3,
			stage_id: 1,
			title:'Lunges',
			stage:'Warm-up',
			type: 'Cardio',
			duration_sec:30,
			img:'lungeleft.png',
			muscles:'legs and back',
			equipment: 'Conan'
		},
		{
			id: 4,
			stage_id: 2,
			title:'Space Swimming Freestyle',
			stage:'Cardio',
			type: 'Cardio',
			duration_sec:900,
			img:'squat.png',
			muscles:'whole body',
			equipment: 'Workout Bench'
		},
		{
			id: 5,
			stage_id: 3,
			title:'Jogging',
			stage:'Cool down',
			type: 'Cardio',
			duration_sec:300,
			img:'legs.png',
			muscles:'legs',
			equipment: 'Conan'
		},
		{
			id: 6,
			stage_id: 4,
			title:'Neck Stretch',
			stage:'Stretching',
			type: 'Stretching',
			duration_sec:30,
			img:'squat.png',
			muscles:'neck',
			equipment: ''
		},
		{
			id: 7,
			stage_id: 4,
			title:'Shoulder Stretch',
			stage:'Stretching',
			type: 'Stretching',
			duration_sec:900,
			img:'squat.png',
			muscles:'shoulders',
			equipment: ''
		},
		{
			id: 8,
			stage_id: 4,
			title:'Core Stretch',
			stage:'Stretching',
			type: 'Stretching',
			duration_sec:30,
			img:'squat.png',
			muscles:'core',
			equipment: 'Conan'
		},
		{
			id: 9,
			stage_id: 4,
			title:'Legs Stretch',
			stage:'Stretching',
			type: 'Stretching',
			duration_sec:30,
			img:'legs.png',
			muscles:'legs',
			equipment: 'Conan'
		}
		
	];
	
	$scope.pauseCountdown = function(){
		$scope.timerrunning = false;
		$interval.cancel(promise);
	}
	
	
	$scope.startCountdown = function(){
		$scope.timerrunning = true;
		console.log("inside countdown");
		if ($scope.countdown > -1){
		
			var promise = $interval(function () {
				if ($scope.countdown >-1){
					var minutes, seconds;
					if ($scope.countdown > 59) {
						minutes = Math.floor($scope.countdown / 60) % 60;
						//countdown -= minutes * 60;
						seconds = $scope.countdown % 60;
					
						$scope.countdown -=1;
						console.log($scope.countdown);
						$scope.timeLeft =  [
							minutes + 'm',
							seconds + 's'
						].join(' ');
					} else {
						seconds = $scope.countdown;
						$scope.countdown -=1;
						console.log($scope.countdown);
						$scope.timeLeft= seconds + 's';
					}
				} else {
					$interval.cancel(promise);
					$scope.nextExercise();
					$scope.timerrunning = false;
				}
			}, 1000);
		}
	}
	
	
	// TWITTER
	$scope.tweets = []; //array of tweets
	$scope.mentions = [];
    twitterService.initialize();


	//when the user clicks the connect twitter button, the popup authorization window opens
    $scope.connectButton = function() {
        twitterService.connectTwitter().then(function() {
            if (twitterService.isReady()) {
                //if the authorization is successful, hide the connect button and display the tweets
                $('#connectButton').fadeOut(function() {
                    $('#getTimelineButton, #signOut').fadeIn();
                    //$scope.refreshTimeline();
                    $scope.connectedTwitter = true;
                });
            } else {

            }
        });
    }


    //using the OAuth authorization result get the latest 20 tweets from twitter for the user
    $scope.refreshTimeline = function(maxId) {
        twitterService.getLatestTweets(maxId).then(function(data) {
            $scope.tweets = $scope.tweets.concat(data);
        }, function() {
            $scope.rateLimitError = true;
        });
    }
    
    $scope.getMentions = function(since_id) {
    	console.log("inside get mentions");
    	var promiseMentions = $interval(function () {
    		console.log("do mention api call");
    		$scope.mentions=[];
			twitterService.getMentions(since_id).then(function(data) {
				$scope.mentions = $scope.mentions.concat(data);
				console.log("$scope.mentionsNumber and $scope.mentions.length" + $scope.mentionsNumber + " " + $scope.mentions.length);
				if ($scope.mentionsNumber  < $scope.mentions.length){
					var audio = new Audio('sounds/crowdcheer.wav');
					audio.play();
					$scope.cheerMessage = "Good job!";

				}
				console.log($scope.mentions);
				$scope.mentionsNumber = $scope.mentions.length;
			}, function() {
				$scope.rateLimitError = true;
			});
		}, 50000);
    }
	
	$scope.tweetStart = function() {
        if (twitterService.isReady()) {
            twitterService.tweetWorkout().then(function(data) {
            $scope.startTweetId = data.id;
            $scope.startTweetCreatedAt = data.created_at;
        }, function() {
            $scope.tweetStartError = true;
        });
    	}
    }
	
    $scope.startWorkout = function(){
    	//$scope.tweetStart();
    	$scope.timerstarted= true;
    	$scope.rid = 0;
    	console.log($scope.routine);
    	console.log("start workout");
    	console.log($scope.routine[$scope.rid].duration_sec);
    	// $scope.$apply(function() {
        $scope.countdown = $scope.routine[$scope.rid].duration_sec;
        // });
		//$scope.startTimer();
		
		$scope.startCountdown();
		
		$scope.getMentions();
		//$scope.addSeconds($scope.countdown);

    	//start countdown
    }
    
    
    // move to next exercise
    $scope.nextExercise = function() {
		console.log("next exercise");
		console.log($scope.rid + " " + $scope.routine.length);
		if ($scope.rid < $scope.routine.length){
			$scope.rid += 1;
			console.log($scope.rid);
			$scope.countdown = $scope.routine[$scope.rid].duration_sec;
			console.log($scope.countdown);
			$scope.startCountdown();
		} else {
			$interval.cancel(promise);
			$interval.cancel(promiseMentions);
			
		}
    }
    
    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
        $('#getTimelineButton, #signOut').fadeOut(function() {
            $('#connectButton').fadeIn();
            $scope.$apply(function() {
                $scope.connectedTwitter = false
            })
        });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.connectedTwitter = true;
        //$scope.getMentions($scope.startTweetId);
        //$scope.refreshTimeline();
    }
	
//var url = "http://localhost:8888/reveldeleteapi/public/api/v1";

// $http.get(url)
//   .success(function(data){
//     $scope.info = data;
//   })
//   .error(function(err){
//     return err;
//   });

}]);
