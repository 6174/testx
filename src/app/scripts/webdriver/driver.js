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
    console.log('start package');
    console.time('package')
    var injectTask = injector.packageTask(config, function(task){
        console.timeEnd('package');
        console.log('package done')
        browser.init({
            browserName:  config.browser || 'chrome'
        }).then(function() {
            return browser.get( config.url || "http://admc.io/wd/test-pages/guinea-pig2.html");
        }).then(function() {
            // document.getElementsByTagName("body").item(0)
            browser.eval('(function(){var h = document.body, s = document.createElement("script"); s.src="http://localhost:5051/tmp/specs.js"; h.appendChild(s);})();');
        }).fin(function() {
            mediator.once('handle-all-test-results', function(){
                browser.quit();
            });
        }).done();
    });
    // $('#TxConsole').text(util.inspect(injectTask));
    // browser.init({
    //     browserName: config.broswer
    // }).get("http://admc.io/wd/test-pages/guinea-pig.html").elementById('i am a link').click().eval("window.location.href").back().elementByCss('#comments').type('Bonjour!').fin(function() {
    //     return browser.quit();
    // }).done();
}
module.exports = {
    run: run
}