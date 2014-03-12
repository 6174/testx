/**
 * Right panelView
 */
var util = require('util'),
    hljs = require('highlight.js');
var RightPanelView = Backbone.View.extend({
    el: '#TxRightPanel',
    events: {
        'click #TxConsoleClearTrigger': 'clear'
    },
    initialize: function() {
        this.logEl = this.$('#TxConsole');
        this.initEditor();
    },
    initEditor: function() {
        var self = this;
        var editor = ace.edit("TxCodeViewer");
        editor.setPrintMarginColumn(false);
        editor.setShowFoldWidgets(false);
        editor.getSession().setMode("ace/mode/javascript");
        editor.getSession().setTabSize(2);
        // editor.renderer.setShowGutter(false);
        editor.getSession().setUseWorker(false);
        editor.setReadOnly(true);
        self.editor = editor;
        window.editor = editor;
        window.addEventListener('resize', function() {
            setTimeout(function(){
	            editor.resize();
            }, 10);
        });
        var code = '';
        mediator.on('combo-script', function(ev) {
            code = ev.code;
        });
        $('body').delegate('.script-view-link', 'click', function(ev) {
            var line = $(this).data('line'),
                row = $(this).data('row');
            // console.log('click', line, row);
            self.showCodeViewPanel({
                code: code,
                line: line,
                row: row
            });
        });
    },
    showCodeViewPanel: function(conf) {
        conf = conf || {};
        this.$('#TabCodeViewer').tab('show');
        if (conf.code) {
            this.editor.setValue(conf.code);
        }
        if (conf.line) {
            this.editor.gotoLine(Number(conf.line));
        }
    },
    log: function(data) {
        var node = $('<p class="log-line"></p>');
        node.html('> ' + hljs.highlight('javascript', data).value);
        this.logEl.prepend(node);
    },
    clear: function() {
        console.log('asdfasdf');
        this.logEl.html('');
    }
});
module.exports = RightPanelView;