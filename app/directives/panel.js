angular.module('app')
.controller('DashboardController', [
	'$scope',
	function  ($scope) {
		
	}
])
.directive('panel', [function() {
	return {
		restrict: 'EA',
		controller: 'DashboardController',
		templateUrl: 'partials/panel.html',
		transclude: true,
		link: function () {
			
		}
	}
}]);
