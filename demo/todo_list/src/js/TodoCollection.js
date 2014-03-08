var app = app || {};
(function(){
	app.TodoCollection = Backbone.Model.extend({
		model: app.TodoModel,
		completed: function(){
			return this.filter(function (todo){
				return todo.get('completed');
			});
		},
		remaining: function () {
			return this.without.apply(this, this.completed());
		},
		nextOrder: function () {
			if (!this.length) {
				return 1;
			}
			return this.last().get('order') + 1;
		},
		// Todos are sorted by their original insertion order.
		comparator: function (todo) {
			return todo.get('order');
		}
	});
	// Create our global collection of **Todos**.
	app.todos = new Todos();
})();

 
