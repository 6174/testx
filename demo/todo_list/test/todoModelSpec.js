describe('TodoModel', function(){
	var model;
	 
	beforeEach(function() {
		expect(app).not.toBe(null);
	    model = new app.TodoModel();
	    console.log(model);
	});

	it('model should not be null', function(){
		expect(model).not.toBe(null);
	});

	it('model default values should equal title:default_tile, complete:complete', function(){
		expect(model.get('title')).toEqual('default_title');
		expect(model.get('completed')).toEqual(false);
	});

	it('instance model with config', function(){
		var title = 'title from config';
		model = new app.TodoModel({title: title});
		expect(model.get('title')).toNotEqual(title);
	});

	it('after toggle called complete should be toggle', function(){
		model.toggle();
		expect(model.get('completed')).toBeTruthy();
	});
});	