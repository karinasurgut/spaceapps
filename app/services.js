angular.module('myApp.services', []).factory('twitterService', function($q,$timeout) {

    var authorizationResult = false;

    return {
        initialize: function() {
            //initialize OAuth.io with public key of the application            
            OAuth.initialize('2CczWLZZ10QbrktrIgrozlD_GYs', {
                cache: true
            });
            //try to create an authorization result when the page loads,
            // this means a returning user won't have to click the twitter button again
            authorizationResult = OAuth.create("twitter");
        },
        isReady: function() {
            return (authorizationResult);
        },
        connectTwitter: function() {
            var deferred = $q.defer();
            OAuth.popup("twitter", {
                cache: true
            }, function(error, result) {
                // cache means to execute the callback if the tokens are already present
                if (!error) {
                    authorizationResult = result;
                    deferred.resolve();
                } else {
                    //do something if there's an error

                }
            });
            return deferred.promise;
        },
        clearCache: function() {
            OAuth.clearCache('twitter');
            authorizationResult = false;
        },
        getLatestTweets: function(maxId) {
            //create a deferred object using Angular's $q service
            var deferred = $q.defer();
            var url = '/1.1/statuses/home_timeline.json';
            if (maxId) {
                url += '?max_id=' + maxId;
            }
            var promise = authorizationResult.get(url).done(function(data) {
                // https://dev.twitter.com/docs/api/1.1/get/statuses/home_timeline
                // when the data is retrieved resolve the deferred object
                deferred.resolve(data);
            }).fail(function(err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        tweetWorkout: function() {
            console.log("Sending API call to twitter");

        	var deferred = $q.defer();
        	var url ='/1.1/statuses/update.json?status=I%27m+starting+my+morning+%23cardio+on+ISS.+Tweet+%40sydneyastrocize+to+cheer%21';
			var promise = authorizationResult.post(url).done(function(data) {
				deferred.resolve(data);
			}).fail(function(err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        },
        getMentions: function(since_id) {
        	console.log("Sending API call to twitter");
        	var deferred = $q.defer();
        	var url ='/1.1/statuses/mentions_timeline.json';
        	if (since_id) {
                url += '?since_id=' + since_id;
            }
			var promise = authorizationResult.get(url).done(function(data) {
				deferred.resolve(data);
				console.log("getmentions");
			}).fail(function(err) {
                deferred.reject(err);
            });
            //return the promise of the deferred object
            return deferred.promise;
        }
        
    }
});