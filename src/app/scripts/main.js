/**
 * @author: 6174
 * @desc: 入口文件
 *
 */

var path        = require('path'),
    fs          = require('fs'),
    util		= require('util'),
    events      = require('events'),
    //@note: require的路径根据脚本所在的html的路径来计算的，执行环境为在node
    FileManager = require('./scripts/file/FileManager');

//--入口函数
(function init(){
	shareMainContext();
	listenAndHandleError();
	$(function(){
		startApp();
	})
})();

function startApp(){
	require('./scripts/server.js').start();
	require('./scripts/experiment');
	require('./scripts/appEvent');
	require('./scripts/ui/index');
}

function shareMainContext(){
	var gui = require('nw.gui');

	global.gui = gui;

	global.mainWindow = gui.Window.get();

	global.$ = $;
	global.Backbone = Backbone;
	global._ = _;

	global.localStorage = window.localStorage;

	//--整个app的和两个上下文之间的信息中介者
	global.mediator = new events.EventEmitter();
	global.mediator.fire = global.mediator.emit;

	global.debug = function(msg){
		console.log(msg);
	}
}

function listenAndHandleError(){

	process.on('uncaughtException', function (err) {
	    var message = '---uncaughtExceptionsed---\n' + err.stack + '\n\n';
	    // fs.appendFile(FileManager.errorLogFile, message);
	    console.log(message);
	});

	// window.addEventListener('error', function (err) {
	//     var message = '---error---\n' + err.filename + ':' + err.lineno + '\n' + err.message + '\n\n';
	//     // fs.appendFile(FileManager.errorLogFile, message);
	//     window.alert(message);
	//     return false;
	// }, false);
}
