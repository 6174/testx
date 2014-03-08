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
		this.logEl = this.$('#TxConsole'); 
		this.initEditor();
	},
	initEditor: function(){
		var editor = ace.edit("TxCodeViewer");
	    editor.setPrintMarginColumn(false);
	    editor.setShowFoldWidgets(false);
	    editor.getSession().setMode("ace/mode/javascript");
	    editor.getSession().setTabSize(2);
	    // editor.renderer.setShowGutter(false);
	    editor.getSession().setUseWorker(false);
	    editor.setReadOnly(true);
	    this.editor = editor;
	    window.editor = editor;
	},
	log: function(data){
		var node = $('<p class="log-line"></p>')
		node.text(util.inspect(data));
		this.logEl.prepend(node);
	},
	showCode: function(data){

	},
	clear: function(){
		console.log('asdfasdf');
		this.logEl.html('');
	}
});

module.exports = RightPanelView;