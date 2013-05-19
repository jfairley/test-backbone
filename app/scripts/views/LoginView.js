define([
	'jquery',
	'underscore',
	'backbone',
	'models/LoginCredentials',
	'text!templates/loginTemplate.html'
], function($, _, Backbone, Session, loginTemplate) {
	var LoginView = Backbone.View.extend({
		initialize: function() {
			this.model = new Session();
			this.model.view = this;
		},

		render: function() {
			var compiledTemplate = _.template( loginTemplate );

			this.$el.html(compiledTemplate);
		},

		events: {
			'submit form.login': 'login', // On form submission
			'click .logout': 'logout'
//			"click #loginButton": "login",
//			"change #username": "setUsername",
//			"change #password": "setPassword"
		},
		 
	//	setUsername: function(e){
//			Session.set({'auth_user': $('#username').val()});
//		},
//		 
//		setPassword: function(e){
//			Session.set({'auth_password': $('#password').val()});
//		},

		// event handlers
		login: function(ev) {

			// Disable the button
			$('[type=submit]', ev.currentTarget).val('Logging in').attr('disabled', 'disabled');
			// Serialize the form into an object using a jQuery plgin
			this.model.login({
				'auth_user': $('#username').val(),
				'auth_password': $('#password').val()
			});
			return false;



			/*this.model.save({
				'username': $('#username').val(),
				'auth_user': $('#username').val(),
				'auth_password': $('password').val()
			}, {
				success: function(model, resp) {
					alert('success');
			//		new LibraryView.Notice({message: msg});

			//		self.model = model;
			//		self.render();
			//		self.delegateEvents();

		//			Backbone.history.saveLocation('mynotes/' + model.id);
				},
				error: function() {
					alert('error');
			//		new LibraryView.error();
				}
			});
*/
		}
	});

	return LoginView;
});