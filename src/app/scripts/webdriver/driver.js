/**
 * testX driver
 */
var colors = require('colors'),
    util = require('util'),
    injector = require('./injectTask.js'),
    wd = require('wd'),
    browser;
(function init() {
    browser = wd.promiseChainRemote();
    browser.on('status', function(info) {
        // console.log(info.cyan);
    });
    browser.on('command', function(meth, path, data) {
        // console.log(' > ' + meth.yellow, path.grey, data || '');
    });
})();

(function spawnSeleniumStandalone(config) {
    var spawn = require('child_process').spawn;
    var path = require('path');
    var path = path.join(__dirname, '../../../node_modules/selenium-standalone/bin/start-selenium.js');
    var args = [path];
    spawn('node', args);
})();

function run(config) {
    // browser.done();
    var injectTask = injector.getTask(config);
    // $('#TxConsole').text(util.inspect(injectTask));
    // browser.init({
    //     browserName: config.broswer
    // }).get("http://admc.io/wd/test-pages/guinea-pig.html").elementById('i am a link').click().eval("window.location.href").back().elementByCss('#comments').type('Bonjour!').fin(function() {
    //     return browser.quit();
    // }).done();
    console.log(config);
    browser.init({
        browserName:  config.browser || 'chrome'
    }).then(function() {
        return browser.get( config.url || "http://admc.io/wd/test-pages/guinea-pig2.html");
    }).then(function() {
        browser.eval('(function(){var h = document.getElementsByTagName("head").item(0), s = document.createElement("script"); s.src="http://localhost:5051/tmp/combo.js"; h.appendChild(s);})();');
    }).fin(function() {
        // return browser.quit();
    }).done();
}
module.exports = {
    run: run
}