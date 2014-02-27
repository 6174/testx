/**
 * projectManager
 */
var path = require('path'),
	fs	= require('fs-extra'),
	projectSetting = require('./projectSetting.js');

//--project数据存储
var DB = {
	projects: {},
	settings: {}
};

function addProject(dirname){
	mediator.emit('loading-project');
	if(isProjectExists(dirname)){
		mediator.emit('loading-project-info', {
			info: 'project exists' 
		});
	} else {
		doAddProject(dirname);
	}
}

function isProjectExists(dirname){
	//--判断是否已经加入了该项目
	if(DB.projects[dirname]){
		return true;
	}
}

function doAddProject(dirname){
	var projectConfig = loadProjectConfigIfExist(dirname); 
	
	if(!projectConfig){
		mediator.emit('loading-project-error', {
			error: 'directory not exists'
		});
		return;
	}
	projectConfig.dirname = dirname; 

	mediator.emit('loaded-project', {
		projectConfig: projectConfig 
	});

	addProjectToDB(projectConfig);
}

function loadProjectConfigIfExist(dirname){
	var config = projectSetting.parseProjectConfig(dirname);
	return config;
}

function addProjectToDB(projectConfig){
	DB.projects[projectConfig.dirname] = projectConfig;
	//--write to file
}

function loadProjectsFromDB(){
	//--load setting from fire
	var projects = {};
	DB.projects = projects;
	mediator.emit('load-projects-from-db', {
		data: projects
	});
}

function runAProject(projectConfig){
	// var tasks = createRunTasksFromProjectConfig(projectConfig);
}

module.exports = {
	addProject: addProject,
	runAProject: runAProject,
	loadProjectsFromDB: loadProjectsFromDB
};

