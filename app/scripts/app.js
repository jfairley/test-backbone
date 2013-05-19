define([
	'backbone',
	'router'
], function(Backbone, Router) {
  var App = Backbone.View.extend({
    initialize: function() {
    	Router.initialize();
    	console.log( 'Wahoo!' );
    }
  });

  return App;
});