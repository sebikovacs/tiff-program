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
				console.log($scope.dayProgramTables)
				$scope.dayLocationsRaw = $scope.dayProgramRaw[0].div[1].div;
				$scope.dayLocations = [];

				//get the event locations
				angular.forEach($scope.dayLocationsRaw, function (item) {
					if (item.class == 'locatie'){
						$scope.dayLocations.push(item)
					}
				});
				
				//make sure the tr is an array
				angular.forEach($scope.dayProgramTables, function(item){
					
					if (item.tbody.tr.length == undefined) {
						item.tbody.tr = new Array(item.tbody.tr);
					}

				})
				

				//spreadsheet key
				var key = '0AhwOls2FTsDFdHJ6TDJFbUV3RjdTRG5FRmpMUFc0RGc';
				
				//get trailers array from google drive
				$scope.showInfo = function (data){
					
					$scope.trailers = data;
					
				}
				
				Tabletop.init({
					key: key,
					callback: $scope.showInfo,
					simpleSheet: true
				})
				
				
				//Methods
				$scope.ShowTrailer = function (model, index) {
					
					//the model from tiff.ro
					$scope.bigModel = model;
					
					//local model
					$scope.model = {};
					$scope.model.title = model.td[1].a.content;

					//find the movie trailer in the google drive array
					var title = model.td[1].a.content;
					var trailer = _.where($scope.trailers, {titlero: title});

					//set default trailer to tiff 2013 clip
					var trailertiff = '8Bsa8_IKa3o';
					
					if (trailer.length > 0){
						$scope.model.video = trailer[0].video;
					} else {
						$scope.model.video = trailertiff;
					}
					
					//show trailer div
					$scope.showModal = true;

				}

				//check if user has favorites in store
				$rootScope.favorites = store.get('favmovies') || [];
				
				//change color of the badge in the header if user has movies
				if($rootScope.favorites) {
					$rootScope.showDefault = false;
				} else {
					$rootScope.showDefault = true;
				}

				console.log($rootScope.favorites)

				//save a list of favorite movies
				$scope.AddFavorite = function (model) {
					
					// add movie to list
					$rootScope.favorites.push(model);

					//save movie list to localstorage
					store.set('favmovies', $rootScope.favorites);

					//change header badge color
					$rootScope.showDefault = false;

				}

				// make the right column stick to header
				$("#sticker").sticky({topSpacing:0});
			}
		})
	}
]);

