angular.module('app')
.filter('movieTitle', function () {
	return function (text) {
		
		var movieTitle = text.split('/');
		movieTitle = movieTitle[movieTitle.length - 1];
		return movieTitle;
	}
});