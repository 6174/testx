//--global app 
var app = app || {};

(function(){
	app.TodoModel = Backbone.Model.extend({
		defaults: function(){
			return {
				title: 'default_title',
				completed: false
			}
		},
		toggle: function () {
			// that.log(asd);
			this.set('completed', !this.get('completed'));
		}
	});
})();