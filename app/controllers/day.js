/*
 * First page Controller 
 */
angular.module('app').controller('Day', [
	'$rootScope',
	'$scope',
	'$location',
	'$routeParams',
	'$filter',
	'$compile',
	'data',
	function($rootScope, $scope, $location, $routeParams, $filter, $compile, data) {
		$scope.program = data.GetTiffProgram();		
		$scope.showModal = false;

		$scope.$watch('program.readyState', function () {
			
			if ($scope.program.readyState == 'complete') {

				$scope.fullProgram = $scope.program.content;

				$scope.dayProgramRaw = $filter('filter')($scope.fullProgram, {id: $routeParams.dayId});
				$scope.dayProgramTables = $scope.dayProgramRaw[0].div[1].table
				$scope.dayLocations = $scope.dayProgramRaw[0].div[1].div
				

				$scope.ShowTrailer = function (model) {
					$scope.showModal = true;					
				}
			}
		})
	}
]);

