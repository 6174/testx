/**
 * center panel view
 */
var CenterPanelView = Backbone.View.extend({
    el: '#TxCenterPanel',
    els: {},
    childviews: {},
    events: {},
    initialize: function() {
    	console.log('initialize centerpanel');
    },
    initCustomScroll: function() {
        var el = this.els['playground'] = this.$('#TxPlayground');
        console.log(el);
        // $("#content-1").mCustomScrollbar("scrollTo","#content-2");
    },
    render: function() {}
});
module.exports = CenterPanelView;