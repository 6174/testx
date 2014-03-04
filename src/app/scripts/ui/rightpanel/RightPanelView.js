/**
 * Right panelView
 */
var RightPanelView = Backbone.View.extend({
	el: '#TxRightPanel',
	events: {
		'click #TxConsoleClearTrigger': 'clear'
	},
	initialize: function(){
		console.log('this.el', this.el);
		this.logEl = $('#TxConsole'); 
	},
	log: function(data){
		var node = $('<p class="log-line"></p>')
		node.text(JSON.stringify(data));
		this.logEl.append(node);
	},
	clear: function(){
		console.log('asdfasdf');
		this.logEl.html('');
	}
});

module.exports = RightPanelView;