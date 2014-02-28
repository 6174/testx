/**
 * project list view
 */
var ProjectItemView = require('./ProjectItemView'),
    ProjectList = require('../../project/ProjectCollection.js'),
    ProjectModel = require('../../project/ProjectModel.js');
    
var ProjectListView = Backbone.View.extend({
    el: $('#LeftPanel'),
    template: '',
    events: {},
    initialize: function() {
        this.listenTo(ProjectList, 'add', this.addOne);
        this.listenTo(ProjectList, 'reset', this.addAll);
    },
    render: function() {},
    addOne: function(project) {
        var view = new ProjectItemView({
            model: project
        });
        //append (view.render().el);
    },
    addAll: function() {
        ProjectList.each(this.addOne, this);
    }
});
module.exports = ProjectListView;