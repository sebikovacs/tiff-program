/*
 * Builder Controller 
 */
angular.module('app').controller('Dashboard', [
	'$rootScope',
	'$scope',
	'$location',
	'$filter',
	'$compile',
	'data',
	function($rootScope, $scope, $location, $filter, $compile, data) {

		$scope.program = data.GetTiffProgram();		
		$scope.$watch('program.readyState', function () {
			console.log($scope.program.readyState);
			if ($scope.program.readyState == 'complete') {

				$scope.fullProgram = $scope.program.content
			}
		})

	}
]);

