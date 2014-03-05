/**
 * Test Playground View
 */

var TestSuitView = require('./TestSuitView.js'),
	testSuits = require('./testSuits.js');

var TestPlaygroundView = Backbone.View.extend({
	el: '#TxPlayground',
	events: {},
	initialize: function(){
		this.listenTo(testSuits, 'add', this.addSuit);	
	},
	addSuit: function(suitModel){
		console.timeEnd('suit');
		console.log('-----------------addSuitView');
		var suitView = new TestSuitView({model: suitModel});
		var node = suitView.render().el;
		this.$el.append(node);
	},
	reset: function(){
		this.$el.html('');
	}
});

module.exports = TestPlaygroundView;