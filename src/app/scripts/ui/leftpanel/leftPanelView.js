/**
 * project list view
 */
var ProjectListView = require('./ProjectListView.js');
var LeftPanelView = Backbone.View.extend({
    el: $('#LeftPanel'),
    els: {},
    childViews: {},
    events: {},
    initialize: function(){
    	this.childViews['projectListView'] = new ProjectListView();
    }
});
module.exports = LeftPanelView;

