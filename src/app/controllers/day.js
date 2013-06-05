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
		$scope.showNext = true;

		$scope.$watch('program.readyState', function () {
			
			if ($scope.program.readyState == 'complete') {

				$scope.fullProgram = $scope.program.content;
				$scope.showLoader = false;

				$scope.dayNo = parseInt($routeParams.dayId);

				//hide next button
				if ($scope.dayNo > 9) {
					$scope.showNext = false					
				}

				// create timestamp for date
				var d = new Date('31 May 2013');
				

				
				if ($scope.dayNo == 1) {
					$scope.timestamp = d.getTime();
				} else if ($scope.dayNo > 1 ) {
					$scope.timestamp = new Date(($scope.dayNo - 1) + ' June 2013').getTime();
				}

				

				$scope.dayProgramRaw = $filter('filter')($scope.fullProgram, {id: $routeParams.dayId});
				$scope.dayProgramTables = $scope.dayProgramRaw[0].div[1].table;

				
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

					angular.forEach(item.tbody.tr, function (obj) {
						obj.dayId = $routeParams.dayId;
					});

				})


				

				//spreadsheet key
				var key = '0AhwOls2FTsDFdHJ6TDJFbUV3RjdTRG5FRmpMUFc0RGc';
				
				//get trailers array from google drive
				$scope.trailers = {
					content: [],
					readyState: 'loading'
				}
				
				$scope.showInfo = function (data){
					
					$scope.trailers = {
						content: data,
						readyState: 'complete'
					};
					$scope.$apply();
					
				}
				
				Tabletop.init({
					key: key,
					callback: $scope.showInfo,
					simpleSheet: true
				});
				
				$scope.detailsSpinner = true;

				$scope.GetYotubeTrailer = function(model){
					//get movie link
					var link = model.td[1].a.href.split('/'),
						trailerCode = {
							readyState: 'loading',
							content: []
						};
					
					link = link[link.length - 1];

					$scope.originalTitle = data.GetMovieOriginalTitle({
						title: link
					});

					
					$scope.$watch('originalTitle.readyState', function () {
						
						if($scope.originalTitle.readyState == 'complete') {

							var vq = $scope.originalTitle.content.query.results.div.p;
							vq = vq.split('(')[0];

							var url = 'http://gdata.youtube.com/feeds/videos?vq=' + vq + 
							       '&max-results=8&alt=json-in-script&' + 
							       'callback=?&orderby=relevance&' + 
							       'sortorder=descending&format=5&fmt=18'

							$.getJSON(url, function (data) {
								if(data.feed.entry){
									
									trailerCode.content.push(data.feed.entry[0].link[0].href.split('?')[1].split('&')[0].split('=')[1]);
									
								} else {
									trailerCode.content.push('8Bsa8_IKa3o');
								}
								$scope.$apply();
							})
						}
					})

					return trailerCode;
				}

				$scope.DisplayMovieDetails = function (model) {
					
					//get movie link
					var link = model.td[1].a.href.split('/');
					link = link[link.length - 1];

					$scope.movieDetails = data.GetMovieDetails({
						title: link
					});

					
					$scope.$watch('movieDetails.readyState', function () {
						if($scope.movieDetails.readyState == 'complete') {
							//hide spinner
							$scope.detailsSpinner = false;
							
							$scope.movieData = $scope.movieDetails.content.query.results.div.div;
							
						}
					})

					

				};
				
				//Methods
				$scope.ShowTrailer = function (model) {
					
					//the model from tiff.ro
					$scope.bigModel = model;
					
					//local model
					$scope.model = {};
					$scope.model.title = model.td[1].a.content;

					$scope.DisplayMovieDetails(model);
					$scope.model.video = $scope.GetYotubeTrailer(model);
					

					// //find the movie trailer in the google drive array
					// var title = model.td[1].a.content;
					// var trailer = _.where($scope.trailers.content, {titlero: title});
					
					// if ($scope.trailers.content.length == 0) {
					// 	//hide video and show loader
					// 	$scope.showLoader = true;
					// 	$scope.showVideo = false;

					// 	$scope.$watch('trailers.readyState', function () {
					// 		if ($scope.trailers.readyState == 'complete') {
					// 			var trailer = _.where($scope.trailers.content, {titlero: title});

					// 			//set default trailer to tiff 2013 clip
					// 			var trailertiff = '8Bsa8_IKa3o';
								
					// 			if (trailer.length > 0){
					// 				$scope.model.video = trailer[0].video;
					// 			} else {
					// 				$scope.model.video = trailertiff;
					// 			}

					// 			$scope.showLoader = false;
					// 			$scope.showVideo = true;

					// 		}
					// 	});
					// } else {
					// 	var trailer = _.where($scope.trailers.content, {titlero: title});
					// }

					
	
					// //set default trailer to tiff 2013 clip
					// var trailertiff = '8Bsa8_IKa3o';
					
					// if (trailer.length > 0){
					// 	$scope.model.video = trailer[0].video;
					// } else {
					// 	$scope.model.video = trailertiff;
					// }
					
					//show trailer div
					$scope.showModal = true;
					$scope.showLoader = false;
				}

				if ($routeParams.movieTitle) {
					
					$routeParams.movieTitle;
					
					
					//find movie
					angular.forEach($scope.dayProgramTables, function (item) {
						angular.forEach(item.tbody.tr, function (obj) {
							if ($routeParams.movieTitle == $filter('movieTitle')(obj.td[1].a.href)){
								$scope.ShowTrailer(obj);
							}
						})
					});
				};

				//check if user has favorites in store
				$rootScope.favorites = store.get('favmovies') || [];
				
				//change color of the badge in the header if user has movies
				if($rootScope.favorites) {
					$rootScope.showDefault = false;
				} else {
					$rootScope.showDefault = true;
				}

				
				//save a list of favorite movies
				$scope.AddFavorite = function (model) {
					
					// add movie to list
					if ($rootScope.favorites.indexOf(model) == -1) {
						$rootScope.favorites.push(model);
						
						//save movie list to localstorage
						store.set('favmovies', $rootScope.favorites);
					}


					//change header badge color
					$rootScope.showDefault = false;

				}

				// make the right column stick to header
				$("#sticker").sticky({topSpacing:0});

				
			}
		})
	}
]);

