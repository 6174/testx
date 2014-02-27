/**
 * project list
 */
var Backbone = require('backbone'),
	ProjectModel = require('./ProjectModel.js');

var ProjectList = Backbone.Collection.extend({
	model: ProjectModel
});

return ProjectList;