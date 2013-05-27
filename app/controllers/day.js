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


				$scope.dayNo = $routeParams.dayId;
				$scope.dayProgramRaw = $filter('filter')($scope.fullProgram, {id: $routeParams.dayId});
				$scope.dayProgramTables = $scope.dayProgramRaw[0].div[1].table;
				$scope.dayLocationsRaw = $scope.dayProgramRaw[0].div[1].div;
				$scope.dayLocations = [];

				angular.forEach($scope.dayLocationsRaw, function (item) {
					if (item.class == 'locatie'){
						$scope.dayLocations.push(item)
					}
				});
				
				angular.forEach($scope.dayProgramTables, function(item){
					
					if (item.tbody.tr.length == undefined) {
						item.tbody.tr = new Array(item.tbody.tr);
					}

				})
				

				$scope.ShowTrailer = function (model) {
					$scope.showModal = true;
					$scope.yt = model.td[5].yt;
					
				}

				$scope.HideModal = function () {
					$scope.showModal = false;					
				}
			}
		})
	}
]);

