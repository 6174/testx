/**
 * Test Playground View
 */

var TestSuitView = require('./TestSuitView.js'),
	testSuits = require('./testSuits.js');

var TestPlaygroundView = Backbone.View.extend({
	el: $('#TxPlayground'),
	events: {},
	initialize: function(){
		this.listenTo(testSuits, 'add', this.addSuit);	
	},
	addSuit: function(suitModel){
		var suitView = new TestSuitView({model: suitModel});
		var node = suitView.render().el;
		console.log(node, this.$el);
		$('#TxPlayground').append('<div> I am a joker</div>');
		// $('#TxPlayground').append(node);
	}
});

module.exports = TestPlaygroundView;