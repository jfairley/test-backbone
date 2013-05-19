define([
	'jquery',
	'underscore',
	'backbone'
], function($, _, Backbone) {
	var SessionModel = Backbone.Model.extend({
		defaults: {
			'auth_user': '',
			'auth_password': ''
		},

		url: "/reachengine/security/login",

		initialize: function(){
			this.bind("change", this.attributesChanged);


			var that = this;
			// Hook into jquery
			// Use withCredentials to send the server cookies
			// The server must allow this through response headers
			$.ajaxPrefilter( function( options, originalOptions, jqXHR ) {
					options.xhrFields = {
					withCredentials: true
				};
				// If we have a csrf token send it through with the next request
				if(typeof that.get('_csrf') !== 'undefined') {
					jqXHR.setRequestHeader('X-CSRF-Token', that.get('_csrf'));
				}
			});
		},

		login: function(creds) {
			// Do a POST to /session and send the serialized form creds
			this.save(creds, {
				success: function () {}
			});
		},

		logout: function() {
			// Do a DELETE to /session and clear the clientside data
			var that = this;
			this.destroy({
				success: function (model, resp) {
					model.clear()
					model.id = null;
					// Set auth to false to trigger a change:auth event
					// The server also returns a new csrf token so that
					// the user can relogin without refreshing the page
					that.set({auth: false, _csrf: resp._csrf});

				}
			});      
		},

		getAuth: function(callback) {
			// getAuth is wrapped around our router
			// before we start any routers let us see if the user is valid
			this.fetch({
				success: callback
			});
		},

		attributesChanged: function(){
			var valid = false;
			if (this.get('auth_user') && this.get('auth_password'))
				valid = true;
			this.trigger("validated", valid);
		}
	});

	return SessionModel;
});