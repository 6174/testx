/**
 * mediator event listener
 * mediator负责全局事件的监听， 负责让ui - model - backend 各部分解耦
 */
var util = require('util'),

    //--global ui appview
    ui = require('./ui/index.js'),

    //--model collections
    testSuits = require('./ui/centerpanel/testSuits.js'),
    projectCollection = require('./project/projectCollection.js'),

    //--broser webdriver
    driver = require('./webdriver/driver.js');


(function init() {
    initProjectEvent();
    initTestRunEvent();
    mediator.on('run-webdriver', function(ev) {
        driver.run(ev.config);
    });

    mediator.on('uilog', function(data){
        ui.log(data);
    });
})()
/**
 * @desc: 初始化项目创建删除初始化相关的事件
 */
function initProjectEvent() {
    mediator.on('add-project', function(ev) {
        projectCollection.addProjectBySrc(ev.value);
    });

    mediator.on('loading-project', function(ev) {
        console.log('loading-project');
    });

    mediator.on('loading-project-error', function(ev) {
        console.log('Error:' + ev.error);
    });

    mediator.on('loading-project-info', function(ev) {
        //--loading project info
        console.log('info: ' + ev.info);
    });
}
/**
 * @desc: 初始化测试运行过程中的全局事件
 */
function initTestRunEvent() {
    mediator.on('handle-client-log', function(data){
        ui.log(data.message);
    });

    mediator.on('handle-tests-start', function(){
    });

    mediator.on('handle-test-suit', function(data) {
        testSuits.add(data);
    });

    mediator.on('handle-test-result', function(data) {
        testSuits.addSpec(data);
    });
    
    mediator.on('handle-all-test-results', function(data) {
        // console.log('all-test-results', data);
        //--stop-driver
    });
}