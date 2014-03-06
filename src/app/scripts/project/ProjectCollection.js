/**
 * project collection instance
 */
var	path = require('path'),
	projectSettingManager = require('./projectSettingManager.js'),
	projectDbManager = require('./projectDbManager.js');

var ProjectModel = Backbone.Model.extend({
	defaults: function(){
		return {
			dirname: 'directory',
			broswer: 'chrome',
			name: 'project-name',
			url: 'http://localhost:80',
			testFramework: 'jasmine',
			currentProject: false
		};
	},
	initialize: function(){
		this.on('change', function(){});
	},
	toggle: function(){
		this.set('currentProject', !this.get('currentProject'));
	},
	updateFromSettingFile: function(){
		var setting = projectSettingManager.getProjectSetting(this.get('dirname'));
		for(attr in setting){
			this.set(attr, setting[attr]);
		}
	}
});

var ProjectCollection = Backbone.Collection.extend({
	model: ProjectModel,
	initialize: function(){
		this.hashedProjects = {};
		this.updateAll();
		//--read projects from file system
		this.on('add', function(model){
			this.hashedProjects[model.get('dirname')] = model;
			projectDbManager.save(this.models);
		});

		this.on('remove', function(model){
			// window.alert('remove project from collection');
			delete this.hashedProjects[model.get('dirname')];
			projectDbManager.save(this.models);
		});
	},
	addProjectBySrc: function(src){
		mediator.emit('loading-project');
		if(this.exists(src)){
			mediator.emit('loading-project-info', {
				info: 'project already exists!'
			});
			return;
		}
		var setting = projectSettingManager.getProjectSetting(src);
		setting.dirname = src;
		this.add(setting);
	},
	deleteOne: function(){

	},
	//--sync to file
    createAll: function() {  
    },  
	//--read from file
    updateAll: function(options) {  
    	var self = this;
    	projectDbManager.fetch(function(data){
    		data = data || [];
    		self.set(data);
    	});
        return ;
    },  
    deleteAll : function(options) {  
        this.remove(this.models);  
        this.updateAll();
        return this;  
    },
    exists: function(dirname){
    	return this.hashedProjects[dirname] != undefined;
    }
});



module.exports = new ProjectCollection();
