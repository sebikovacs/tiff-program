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
		
		var currentDay = 1;

		// set up routes
		$routeProvider.when('/dashboard', {
			templateUrl: 'partials/dashboard.html',
			controller: 'Dashboard'
		});

		$routeProvider.when('/day/:dayId', {
			templateUrl: 'partials/day.html',
			controller: 'Day'
		});

		$routeProvider.when('/day/:dayId/:movieTitle', {
			templateUrl: 'partials/day.html',
			controller: 'Day'
		});

				
		$routeProvider.otherwise({
			redirectTo: '/day/'+currentDay
		});
		
	}
]).run([
	'$rootScope',
	'$location',
	'$http',
	'$compile',
	'data',
	function($rootScope, $location, $http, $compile, data) {

		
		$rootScope.program = data.GetTiffProgram();		
		$rootScope.$watch('program.readyState', function () {
			
			if ($rootScope.program.readyState == 'complete') {

				$rootScope.fullProgram = $rootScope.program.content;
			}
		})
		
		$rootScope.RemoveFromFavorites = function (model) {
			var index = $rootScope.favorites.indexOf(model);
			console.log($rootScope.favorites);
			$rootScope.favorites.splice(index, 1);
			console.log($rootScope.favorites);
			store.set('favmovies', $rootScope.favorites)
			
		}
		
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