/**
 * center panel view
 */
var TestPlaygroundView = require('./TestPlaygroundView.js'),
    testSuits = require('./testSuits.js');
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
        this.projectSetting = {};
        this.childviews['testPlaygroudView'] = new TestPlaygroundView();
        this.els['progressInfo'] = this.$('#TxTestProgressInfo');
        this.els['runBtn'] = this.$('#TxRun');
        this.listenMediator();
    },
    listenMediator: function() {
        var self = this;
        mediator.on('show-project', function(ev) {
            self.play(ev.config);
        });
        mediator.on('loading-project', function(ev) {
            self.info('loading from ' + ev.src);
        });

        mediator.on('handle-tests-start', function() {
            self.success();
        });

        mediator.on('increase-spec', function(ev) {
            var info = '';
            info += 'total: ' + ev.specCount + ' : '
            info += ev.passCount + ' passed ,';
            info += ev.errorCount + ' failed ,';
            info += ev.pendingCount + ' pending';
            self.info(info);
        });

        mediator.on('spec-falied', function(ev) {
            self.danger();
        });

        mediator.on('show-about', function(ev){
            self.$('#TxCenterPanelNotifier').show();
        });

    },
    success: function(){
        this.$el.removeClass('panel-danger panel-default');
        this.$el.addClass('panel-success');
    },
    default: function(){
        this.$el.removeClass('panel-success panel-danger');
        this.$el.addClass('panel-default');
    },
    danger: function(){
        this.$el.removeClass('panel-success panel-default');
        this.$el.addClass('panel-danger');
    },
    play: function(projectSetting) {
        this.projectSetting = projectSetting;
        this.info(': ' + projectSetting.dirname);
        this.$('#TxCenterPanelNotifier').hide();
    },
    info: function(info) {
        this.els['progressInfo'].text(info);
    },
    run: function() {
        this.info('drivering broswer');
        this.default();
        this.childviews['testPlaygroudView'].reset();
        testSuits.resetTest();
        mediator.fire('run-webdriver', {
            config: this.projectSetting
        });
    }
});
module.exports = CenterPanelView;