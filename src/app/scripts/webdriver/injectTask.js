/**
 * script task
 */
var fs = require('fs-extra'),
    path = require('path'),
    util = require('util');

var publicPath = getPublicPath();
function packageTask(projectConfig, done) {
    var task = getTaskStub();
    setJasmineTask(task, projectConfig);

    walkThroghTestDirectory(task, projectConfig, function(){
	    comboScripts(task);
	    done(task);
    });
    return task;
}

function getTaskStub() {
    return {
        injector: path.join(publicPath, 'inject.js'),
        socketIo: path.join(publicPath, 'socket.io.js'),
        libs: [],
        scripts: [],
        combo: ''
    }
}

function setJasmineTask(task) {
    var jasminePath = path.join(publicPath, 'jasmine2/')
    task.libs = task.libs.concat([
        path.join(jasminePath, 'jasmine.js'),
        path.join(jasminePath, 'boot.js'),
        path.join(jasminePath, 'adapter.js')
    ]);
    task.execTrigger = path.join(jasminePath, 'exec.js');
}

function walkThroghTestDirectory(task, projectConfig, done) {
	walk(projectConfig.dirname, function (err, results){
		if(err){
			throw err;
		}
		results.forEach(function (filename){
			if(path.extname(filename) == '.js'){
				task.scripts.push(filename);
			}
		});
		done();
	    // var testScript = path.join(publicPath, 'test.js');
	    // task.scripts.push(testScript);
	});
}

function comboScripts(task) {
    var str = '';
    // -- libs
    task.libs.forEach(function(item) {
        str += getScript(item);
    });
    str += getScript(task.socketIo);
    str += getScript(task.injector);
    //-- test scripts
    task.scripts.forEach(function(item) {
        str += getScript(item);
    });
    //--exec trigger
    str += getScript(task.execTrigger);
    task.combo = str;
    task.combosrc = path.join(__dirname, '../../assets/public/tmp/' + "combo.js");
    fs.writeFile(task.combosrc, str, function(e) {
        if (e) throw e;
    });
}

function getScript(src) {
    return '\/******************\/\n' + fs.readFileSync(src) + '\n\n';
}

function getPublicPath() {
    return path.join(__dirname, '../../assets/public/');
}

// http://stackoverflow.com/q/5827612/
function walk(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err) {
            return done(err);
        }
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file) {
                return done(null, results);
            }
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    results.push(file);
                    next();
                }
            });
        }());
    });
}
module.exports = {
    packageTask: packageTask
};