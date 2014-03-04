/**
 * Right panelView
 */
var util = require('util');
var RightPanelView = Backbone.View.extend({
	el: '#TxRightPanel',
	events: {
		'click #TxConsoleClearTrigger': 'clear'
	},
	initialize: function(){
		this.logEl = $('#TxConsole'); 
	},
	log: function(data){
		var node = $('<p class="log-line"></p>')
		node.text(util.inspect(data));
		this.logEl.prepend(node);
	},
	clear: function(){
		console.log('asdfasdf');
		this.logEl.html('');
	}
});

module.exports = RightPanelView;