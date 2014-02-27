require('colors');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
chai.should();

var wd = require('wd');

// browser = wd.remote(); 
var browser = wd.promiseChainRemote();
// enables chai assertion chaining
chaiAsPromised.transferPromiseness = wd.transferPromiseness;


browser.on('status', function(info) {
  console.log(info.cyan);
});

browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});


(function spawnSeleniumStandalone(config){
  var spawn = require('child_process').spawn;
  var path = require('path');
  var path = path.join(__dirname, '../../../node_modules/selenium-standalone/bin/start-selenium.js');
  var args = [path];
  spawn('node', args);
})();


function run(config){
  // browser.done();
  browser
    .init({browserName: config.broswer})
    .get("http://admc.io/wd/test-pages/guinea-pig.html")
    .elementById('i am a link')
    .click()
    .eval("window.location.href")
    .back()
    .elementByCss('#comments').type('Bonjour!')
    .fin(function() { return browser.quit(); })
    .done();
}


module.exports = {
  run: run
}