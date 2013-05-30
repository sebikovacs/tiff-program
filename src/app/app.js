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
		
		var currentDay;
		var d = new Date();
		
		var date = d.getDate();
		var month = d.getMonth();
		
		if (month == 4) {
			currentDay = 1;
		} else if (month > 4 ) {
			currentDay = date + 1;
		} else if (month > 4 && date > 9) {
			currentDay = 10;
		}

		$routeProvider.when('/despre', {
			templateUrl: 'partials/despre.html',
			controller: 'Day'
		});

		$routeProvider.when('/contact', {
			templateUrl: 'partials/contact.html',
			controller: 'Day'
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

		$rootScope.days = ['Vineri', 'Sambata', 'Duminica', 'Luni', 'Marti', 'Miercuri', 'Joi', 'Vineri', 'Sambata', 'Duminica'];
		$rootScope.program = data.GetTiffProgram();
		$rootScope.$watch('program.readyState', function () {
			
			if ($rootScope.program.readyState == 'complete') {

				$rootScope.fullProgram = $rootScope.program.content;
			}
		})
		
		$rootScope.RemoveFromFavorites = function (model) {
			var index = $rootScope.favorites.indexOf(model);
			
			$rootScope.favorites.splice(index, 1);
			
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