/**
 * project item model
 */
var Backbone = require('backbone');

var ProjectModel = Backbone.Model.extend({
	defaults: function() {
		return {
			dirname: 'directory',
			broswer: 'chrome',
			testFramework: 'jasmine'
		}
	}
});

module.exports = ProjectModel;
