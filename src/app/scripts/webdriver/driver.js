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


// // optional extra logging
// browser.{browserName:'chrome'}_debugPromise();
browser.on('status', function(info) {
  console.log(info.cyan);
});
browser.on('command', function(meth, path, data) {
  console.log(' > ' + meth.yellow, path.grey, data || '');
});

// browser.init({browserName:'chrome'}, function(){
//   browser
//     .get("http://admc.io/wd/test-pages/guinea-pig.html")
//     .elementById('i am a link')
//     .click()
//     .eval("window.location.href")
//     .should.eventually.include('guinea-pig2')
// });

browser
  .init({browserName:'chrome'})
  .get("http://admc.io/wd/test-pages/guinea-pig.html")
  .title()
    .should.become('WD Tests')
  .elementById('i am a link')
  .click()
  .eval("window.location.href")
    .should.eventually.include('guinea-pig2')
  .back()
  .elementByCss('#comments').type('Bonjour!')
  .getValue().should.become('Bonjour!')
  .fin(function() { return browser.quit(); })
  .done();
// /* jshint evil: true */
// browser
//   .init()
//   .get("http://admc.io/wd/test-pages/guinea-pig.html")
//   .title()
//     .should.become('WD Tests')
//   .elementById('i am a link')
//   .click()
//   .eval("window.location.href")
//     .should.eventually.include('guinea-pig2')
//   .back()
//   .elementByCss('#comments').type('Bonjour!')
//   .getValue().should.become('Bonjour!')
//   .fin(function() { return browser.quit(); })
//   .done();