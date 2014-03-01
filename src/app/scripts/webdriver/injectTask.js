/**
 * script task
 */
var fs = require('fs-extra'),
	path = require('path'),
	util = require('util');

function getTask(projectConfig){
	var task = getTaskStub();
	switch(projectConfig.testFramework){
		case 'jasmine': 
			setJasmineTask(task, projectConfig);
	}

	setTestTask(task, projectConfig);
	comboScripts(task);
	return task;
}

function getTaskStub(){
	return {
		injector: path.join(getPublicPath(), 'inject.js'),
		socketIo: path.join(getPublicPath(), 'socket.io.js'),
		libs: [],
		scripts: [],
		combo: ''
	}
}

function setJasmineTask(task){
	var jasminePath = path.join(getPublicPath(), 'jasmine2/')
	task.libs = task.libs.concat([
		path.join(jasminePath, 'jasmine.js'),
		path.join(jasminePath, 'boot.js'),
		path.join(jasminePath, 'adapter.js')
	]);
	task.execTrigger = path.join(jasminePath, 'exec.js'); 
}

function setTestTask(task, projectConfig){
	var testScript = path.join(getPublicPath(), 'test.js');
	task.scripts.push(testScript);
}

function comboScripts(task){
	var str = '';

	// -- libs
	task.libs.forEach(function(item){
		str +=  getScript(item);
	});
	str += getScript(task.socketIo);
	str += getScript(task.injector);

	//-- test scripts
	task.scripts.forEach(function(item){
		str += getScript(item);
	});

	//--exec trigger
	str += getScript(task.execTrigger);

	task.combo = str;
	task.combosrc = path.join(__dirname, '../../assets/public/tmp/' + "combo.js");
	fs.writeFile(task.combosrc, str ,function(e){
	    if(e) throw e;
	});
}

function getScript(src){
	return '\/******************\/\n' + fs.readFileSync(src) + '\n\n';
}

function getPublicPath(){
	return path.join(__dirname, '../../assets/public/');
}

module.exports = {
	getTask: getTask
};
