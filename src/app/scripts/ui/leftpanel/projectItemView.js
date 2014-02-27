/**
 * project Item view
 */

var Backbone = require('backbone'),
	ProjectList = require('../../project/ProjectCollection.js'),
	ProjectModel = require('../../project/ProjectModel.js');

var ProjectItemView = Backbone.View.extend({
	tagName: 'li',
	template: '',
	events: {
		'click .view': 'showProject',
		'click .del':  'deleteProject'   
	},
	initialize: function() {
		this.listenTo(this.model, 'change', this.render);
		this.listenTo(this.model, 'destroy', this.remove);
	},
	render: function(){
		this.$el.html('<li>something <span class="del">del</span></li>');
	},
	showProject: function(){
		mediator.fire('show-project', {
			projectModel: this.model
		});
	},
	deleteProject: function(){
		this.model.destroy();
	}
});
module.exports = ProjectItemView;

