define([
	'jquery',
	'underscore',
	'backbone',
	'views/LoginView',
	'models/LoginCredentials'
], function($, _, Backbone, LoginView, LoginCredentials) {
	var AppRouter = Backbone.Router.extend({
		routes: {
			// Default
			'*actions': 'defaultAction'
		}
	});

	var initialize = function() {

		var app_router = new AppRouter();

		app_router.on('route:defaultAction', function(actions) {
			var loginView = new LoginView( { el: $('#main') } );
			loginView.render();
		});

		Backbone.history.start();
	};


	$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
		// Your server goes below
		//options.url = 'http://localhost:8000' + options.url;
		options.url = 'http://10.0.1.4:8080' + options.url;
	});

	return {
		initialize: initialize
	};
});