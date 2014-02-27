/**
 * 实验性的尝试
 */
function init(){
	initHeaderNavigation();
	runWebDriverTest();
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

function runWebDriverTest(){
	//--bing
	var btn = $('#RunWebDriverTest');
	btn.on('click', function(ev){
		mediator.emit('run-webdriver');
	});
}

module.exports = {
	init: init
};