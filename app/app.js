/*
 * App
 */

angular.module('app', [
	'ng',
	'ui',
	'ui.bootstrap'
	])
	.config([
	'$routeProvider',
	'$httpProvider',
	function($routeProvider, $httpProvider) {
		
		// set up routes
		$routeProvider.when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
			controller: 'Dashboard'
		});

		$routeProvider.when('/first-page', {
			templateUrl: 'partials/first-page.html',
			controller: 'FirstPage'
		});

		$routeProvider.when('/second-page', {
			templateUrl: 'partials/second-page.html',
			controller: 'SecondPage'
		});
		
		$routeProvider.otherwise({
			redirectTo: '/dashboard'
		});
		
	}
]).run([
	'$rootScope',
	'$location',
	'$http',
	'$compile',
	'data',
	function($rootScope, $location, $http, $compile, data) {

		


		// safeApply to solve issues with calling $apply too early
		$rootScope.SafeApply = function(fn) {
			var phase = this.$root.$$phase;

			if(!fn) fn = function(){};

			if(phase == '$apply' || phase == '$digest') {
				fn();
			} else {
				this.$apply(fn);
			}
		};
		
	}
]);

// manually load the app
angular.element(document).ready(function() {

	angular.bootstrap(document, ['app']);

	// give it some time to finish bootstraping
	setTimeout(function() {
		var body = document.getElementsByTagName('body')[0];
		angular.element(body).removeClass('loading-app');
	}, 100);

});