/**
 * center panel view
 */
var TestPlaygroundView = require('./TestPlaygroundView.js');

var CenterPanelView = Backbone.View.extend({
    el: '#TxCenterPanel',
    els: {},
    childviews: {},
    events: {
    	'click #TxRun': 'run'
    },
    initialize: function() {
    	console.log('initialize centerpanel');
    	var self = this;
    	var testPlaygroudView = new TestPlaygroundView();
    	this.projectSetting = {};

        mediator.on('show-project', function(ev){
        	self.play(ev.config);
        });
    },
    play: function(projectSetting) {
    	this.projectSetting = projectSetting;
    	this.$('#TxCenterPanelNotifier').hide();
    },
    run: function(){
    	console.log('run-project btn clicked');
		mediator.fire('run-webdriver', {
			config: this.projectSetting
		});
    }
});
module.exports = CenterPanelView;