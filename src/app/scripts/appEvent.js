/**
 * mediator event listener
 */
var util = require('util'),
	projectManager = require('./project/projectManager.js');
	ui = require('./ui/index.js');

function init() {
	initProjectEvent();
	mediator.on('run-webdriver', function(ev) {
		window.alert('run-webdriver');
		require('./webdriver/driver.js');
	});

}

function initProjectEvent(){
	mediator.on('add-project', function(ev){
		projectManager.addProject(ev.value);
	});

	mediator.on('loading-project', function(ev){
		console.log('loading-project');
	});

	mediator.on('loading-project-error', function(ev){
		console.log('Error:' + ev.error);
	});

	mediator.on('loading-project-info', function(ev){
		//--loading project info
		console.log('info: ' + ev.info);
	});

	mediator.on('loaded-project', function(ev){
		//--render panel flower
		console.log('loaded-project');
		console.log(util.inspect(ev));
	});

}





module.exports = {
	init: init
};