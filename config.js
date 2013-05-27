fs = require('fs');
path = require('path');

// See docs at http://brunch.readthedocs.org/en/latest/config.html.

exports.config = {

	modules: {
		definition: false,
		wrapper: false
	},

	paths: {
		public: 'public'
	},
	
	files: {
	
		javascripts: {
			defaultExtension: 'js',
			joinTo: {
				'javascripts/app.js': /app|vendor/,
			},
			order: {
				before: [
					'vendor/jquery-1.9.1.js',
					'vendor/jquery-ui-1.10.2.custom.js',
					'vendor/angular.js',
					'vendor/angular-resource.js',
					'vendor/angular-ui.js',
					
					'vendor/lawnchair.js',
					'vendor/lawnchair-adapter-indexed-db.js',
					'vendor/lawnchair-adapter-dom.js',
					
					'vendor/bootstrap/js/bootstrap.js',

					'app/vendor/ui-bootstrap-0.2.0.js'
				]
			}
		},

		stylesheets: {
			defaultExtension: 'scss',
			joinTo: {
				'stylesheets/app.css': /^app(\/|\\)(?!sass-ie)|vendor(\/|\\)/,
				'stylesheets/ie.css': /^app(\/|\\)sass-ie/
			},
			order: {
				before: []
			}
		}

	},
	
	plugins: {
		autoReload: {
			port: 3333
		}
	},
  
	server: {
		port: 3333,
		base: '/',
		run: 'no'
	}

};