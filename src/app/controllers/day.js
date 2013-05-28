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
				
				var spreadUrl = 'https://docs.google.com/spreadsheet/pub?key=0AhwOls2FTsDFdHJ6TDJFbUV3RjdTRG5FRmpMUFc0RGc&output=html'
				var key = '0AhwOls2FTsDFdHJ6TDJFbUV3RjdTRG5FRmpMUFc0RGc';
				
				$scope.showInfo = function (data){
					
					$scope.trailers = data;
					
				}
				
				Tabletop.init({
					key: key,
					callback: $scope.showInfo,
					simpleSheet: true
				})
				
				

				$scope.ShowTrailer = function (model) {
					var title = model.td[1].a.content;
					
					var trailer = _.where($scope.trailers, {titlero: title});
					var trailertiff = '8Bsa8_IKa3o';
					
					if (trailer.length > 0){
						$scope.yt = trailer[0].video;
					} else {
						$scope.yt = trailertiff;
					}
					
					
					
					$scope.showModal = true;

				}

				$scope.HideModal = function () {
					$scope.showModal = false;
					var trailertiff = '8Bsa8_IKa3o';
					$scope.yt = trailertiff;
				}
			}
		})
	}
]);

