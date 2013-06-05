/*
 * Data service
 */
angular.module('app').factory('data', [
	'$rootScope',
	'$filter',
	function($rootScope, $filter) {
	
		
		
		// methods
		var GetTiffProgram = function(params) {
				
				var tiffprogram = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ftiff.ro%2Fprogram%22%20and%20xpath%3D\'%2F%2F*%5B%40id%3D%22content%22%5D%2Fdiv%2Fdiv%5B3%5D%2Fdiv%2Fdiv%5B2%5D\'%0A&format=json&diagnostics=true';
				
				var results = {
					readyState: 'loading',
					content: []
				}

				var success = function (result) {
					
					results.content = result;
					
					var i = 1;
					angular.forEach(results.content, function(item){
						item.id = i;
						i++;
					})
					
					results.readyState = 'complete';
					$rootScope.$apply();
				};
				
				$.ajax({
				    dataType: "json",
				    url: 'tiff-program.json',
				    success: success,
				    error: function(response) {
				        
				    }
				});
				

				return results;
		
		};
		
		var GetMovieDetails = function (params) {
			var yql = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ftiff.ro%2Ftiff%2Ffilm%2F'+ params.title +'%22%20and%20xpath%3D\'%2F%2F*%5Bcontains(%40class%2C%20%22node-film%22)%5D%2Fdiv%2Fdiv%5B2%5D%2Fdiv%5B2%5D\'&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';


			var results = {
				readyState: 'loading',
				content: []
			}

			var success = function (result) {
				
				results.content = result;
				
				results.readyState = 'complete';
				$rootScope.$apply();
			};
			
			$.ajax({
			    dataType: "json",
			    url: yql,
			    success: success,
			    error: function(response) {
			        
			    }
			});
			

			return results;
		}

		var GetMovieOriginalTitle = function (params) {
			var yql = 'http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D%22http%3A%2F%2Ftiff.ro%2Ftiff%2Ffilm%2F' + params.title + '%22%20and%20xpath%3D\'%2F%2F*%2F%2F*%5Bcontains(%40class%2C%20%22original%22)%5D\'&format=json&diagnostics=true';


			var results = {
				readyState: 'loading',
				content: []
			}

			var success = function (result) {
				console.log('success getting original title');

				results.content = result;
				
				results.readyState = 'complete';
				$rootScope.$apply();
			};
			
			$.ajax({
			    dataType: "json",
			    url: yql,
			    success: success,
			    error: function(response) {
			    	console.log('error getting original title');
			    }
			});
			

			return results;
		}
		
		return {
			GetTiffProgram: GetTiffProgram,
			GetMovieDetails: GetMovieDetails,
			GetMovieOriginalTitle: GetMovieOriginalTitle
		}
		
	}
]);
