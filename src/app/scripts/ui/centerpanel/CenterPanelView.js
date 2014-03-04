/**
 * center panel view
 */
var TestPlaygroundView = require('./TestPlaygroundView.js');

var CenterPanelView = Backbone.View.extend({
    el: '#TxCenterPanel',
    els: {},
    childviews: {},
    events: {},
    initialize: function() {
    	console.log('initialize centerpanel');
        this.childviews['testPlaygroudView'] = new TestPlaygroundView(); 
    },
    render: function() {}
});
module.exports = CenterPanelView;