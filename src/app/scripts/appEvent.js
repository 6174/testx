/**
 * mediator event listener
 */
function init() {
	mediator.on('run-webdriver', function(ev) {
		window.alert('run-webdriver');
		require('./webdriver/driver.js');
	});
}

module.exports = {
	init: init
};