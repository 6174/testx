/**
 * 实验性的尝试
 */
var util = require('util'),
    ejs = require('ejs'),
    fs = require('fs-extra'),
    LeftPanelView = require('./leftpanel/LeftPanelView.js'),
    CenterPanelView = require('./centerpanel/CenterPanelView.js'),
    RightPanelView = require('./rightpanel/RightPanelView.js'),
    NavigationView = require('./NavigationView.js'),
    ErrorModalView = require('./ErrorModalView.js');
var AppView = Backbone.View.extend({
    el: '#TxApp',
    els: {},
    childviews: {},
    events: {
        'click #ShowLogBtn': 'showLog'
    },
    initialize: function() {
        console.log('initialize AppView');
        this.render();
        //--init-child-views
        this.childviews['navigationView'] = new NavigationView();
        this.childviews['leftPanelView'] = new LeftPanelView();
        this.childviews['rightPanelView'] = new RightPanelView();
        this.childviews['centerPanelView'] = new CenterPanelView();
        this.childviews['errorModalView'] = new ErrorModalView();
        // this.centerPanelView = new CenterPanelView();
        // this.rightPanelView = new RightPanelView();
        //--init-ui-els
        this.els['showLogBtn'] = this.$("#someBtn");
        // //--init scroll-bar
        // $('.custom-scrollbar').mCustomScrollbar({
        // 	theme: 'dark',
        // 	advanced:{ updateOnContentResize:true}
        // });
        // mCustomScrollbar("update");
        $("#TxDashbordVsplitter").splitter({
            type: "v",
            outline: false,
            sizeLeft: 490,
            minLeft: 150,
            minRight: 153,
            resizeToWidth: true,
            // dock: "left",
            dockSpeed: 200,
            cookie: "docksplitter",
            dockKey: 'Z', // Alt-Shift-Z in FF/IE
            accessKey: 'I' // Alt-Shift-I in FF/IE
        });
    },
    render: function() {
        var filename = __dirname + '/../../templates/main.ejs';
        var str = fs.readFileSync(filename);
        $(this.el).html(ejs.render(String(str), {
            filename: filename
        }));
    },
    log: function(data) {
        this.childviews['rightPanelView'].log(data);
    },
    addProject: function(projectConfig) {
        // this.childviews['leftPanelView']
        // mediator.emit('run-webdriver', {
        // 	config: projectConfig
        // });
    }
});
module.exports = new AppView();