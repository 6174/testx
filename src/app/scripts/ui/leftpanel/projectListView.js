/**
 * project list view
 */
var ProjectItemView = require('./ProjectItemView.js'),
    projectCollection = require('../../project/projectCollection.js');

var ProjectListView = Backbone.View.extend({
    el: '#TxProjectList',
    els: {},
    template: '',
    events: {},
    initialize: function() {
        this.listenTo(projectCollection, 'add', this.addOne);
        this.listenTo(projectCollection, 'reset', this.addAll);
    },
    addOne: function(project) {
        var view = new ProjectItemView({
            model: project
        });
        this.$el.append(view.render().el);
    },
    addAll: function() {
        projectCollection.each(this.addOne, this);
    }
});
module.exports = ProjectListView;