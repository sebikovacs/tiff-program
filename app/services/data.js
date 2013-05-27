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
					
					results.content = result.query.results.div.div;
					results.readyState = 'complete';

				};
				
				$.ajax({
				    dataType: "json",
				    url: tiffprogram,
				    success: success,
				    error: function(response) {
				        
				    }
				});
				

				return results;
		
		};
		
		
		
		return {
			GetTiffProgram: GetTiffProgram
		}
		
	}
]);
