'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'ngSanitize',
  'myApp.view1',
  'myApp.view2',
  'myApp.version',
  'myApp.home',
  'myApp.dashboard',
  'myApp.services',
  'ngTwitter',
  'ui.bootstrap'
]).config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]).directive('countdown', [
        'Util',
        '$interval',
        function (Util, $interval) {
            return {
                restrict: 'A',
                scope: { date: '@', duration:'@' },
                link: function (scope, element) {
                    //var future;
                   // future = new Date(scope.date);
                    var duration;
                    var i;
                    duration = scope.duration
                    console.log("duration: "+duration);
                    $interval(function () {
                        console.log(Util.dhms(duration));
                        return element.text(Util.dhms(duration));
                    }, 1000);
                }
            };
        }
    ]).factory('Util', [function () {
            return {
                dhms: function (t) {
                	console.log("t: " + t);
                    var minutes, seconds;
                    minutes = Math.floor(t / 60) % 60;
                    t -= minutes * 60;
                    seconds = t % 60;
                    return [
                        minutes + 'm',
                        seconds + 's'
                    ].join(' ');
                }
            };
        }]);