/**
 * 实验性的尝试
 */
var util = require('util'),
	ejs = require('ejs'),
	fs = require('fs-extra'),
	LeftPanelView = require('./leftpanel/LeftPanelView.js'),
	CenterPanelView = require('./centerpanel/CenterPanelView.js'),
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
		this.render();

		//--init-child-views
		this.childviews['navigationView'] = new NavigationView();
		this.childviews['leftPanelView'] = new LeftPanelView();
		this.childviews['centerPanelView'] = new CenterPanelView();
		// this.centerPanelView = new CenterPanelView();
		// this.rightPanelView = new RightPanelView();
		//--init-ui-els
		this.els['showLogBtn'] = this.$("#someBtn");

		//--init scroll-bar
		$('.custom-scrollbar').mCustomScrollbar({
			theme: 'dark',
			advanced:{ updateOnContentResize:true}
		});
		// mCustomScrollbar("update");
	},
	render: function(){
		var filename = __dirname + '/../../templates/main.ejs';
		var str = fs.readFileSync(filename);
		$(this.el).html(ejs.render(String(str), {
			filename: filename
		}));
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
