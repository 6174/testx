/**
 * 实验性的尝试
 */
var util = require('util');

function init(){
	initHeaderNavigation();
}

function initHeaderNavigation(){
	var ipt = $('#IptAddProject'),
		btn = $('#BtnAddProject');
	btn.bind('click', function(ev){
		ipt.click();
	});

	ipt.bind('change', function(){
		mediator.emit('add-project', {value: ipt.val()});
		ipt.val('');
	});


}

function showProject(projectConfig){
	$('#ProjectConfigText').text(util.inspect(projectConfig));
	mediator.fire('run-webdriver', {
		config: projectConfig
	});
}

module.exports = {
	init: init,
	showProject: showProject
};