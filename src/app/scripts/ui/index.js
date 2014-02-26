/**
 * 实验性的尝试
 */
function init(){
	runWebDriverTest();
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