/**
 * 实验性的尝试
 */
var util = require('util'),
	LeftPanelView = require('./leftpanel/leftPanelView.js'),
	NavigationView = require('./NavigationView.js');

var AppView = Backbone.View.extend({
	el: $('#TxApp'),
	els: {},
	childviews: {},
	events: {
		'click #ShowLogBtn': 'showLog'
	},
	initialize: function(){
		console.log('initialize AppView');
		//--init-child-views
		this.childviews['leftPanelView'] = new LeftPanelView();
		this.childviews['navigationView'] = new NavigationView();
		// this.centerPanelView = new CenterPanelView();
		// this.rightPanelView = new RightPanelView();
		//--init-ui-els
		this.els['showLogBtn'] = this.$("#someBtn");
	},
	render: function(){
		window.alert('app view render called');
		_.each(this.childviews, function(view){
			view.render();
		});
	},
	showLog: function(){

	},
	showProject: function(projectConfig){
		$('#ProjectConfigText').text(util.inspect(projectConfig));
		mediator.fire('run-webdriver', {
			config: projectConfig
		});
	}
});

module.exports = new AppView();
