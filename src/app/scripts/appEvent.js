/**
 * mediator event listener
 * mediator负责全局事件的监听， 主要目的是让模块解耦
 */
var util = require('util'),
    projectManager = require('./project/projectManager.js'),
    ui = require('./ui/index.js'),
    testSuits = require('./ui/centerpanel/testSuits.js'),
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
        projectManager.addProject(ev.value);
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
    mediator.on('loaded-project', function(ev) {
        //--render panel flower
        console.log('loaded-project');
        ui.showProject(ev.projectConfig);
    });
}
/**
 * @desc: 初始化测试运行过程中的全局事件
 */
function initTestRunEvent() {
    mediator.on('handle-test-result', function(data) {
        testSuits.addSpec(data);
    });
    mediator.on('handle-test-suit', function(data) {
        testSuits.add(data);
    });
    mediator.on('handle-all-test-results', function(data) {
        // console.log('all-test-results', data);
        //--stop-driver
    });
    mediator.on('handle-client-log', function(data){
        ui.log(data.message);
    });
}