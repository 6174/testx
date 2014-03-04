/**
 * spawn server as a cihld process
 */
var spawn = require('child_process').spawn,
    path = require('path'),
    spliter = '#####';
exports.spawn = function() {
    console.log('spawn server');
    var src = path.join(__dirname, 'server.js')
    var child = spawn('node', [src]);
    child.on('exit', function(terminalCode, signal) {
        child.kill(signal);
    });
    child.stdout.on('data', function(bufferData) {
        var dataArr = bufferData.toString().split(spliter);
        // console.log(dataArr);
        dataArr.forEach(function(it){
        	if(it == ''){ return;}
	        try {
	            var data = JSON.parse(it);
	            mediator.emit(data.ev, data);
	        } catch (e) {
	            throw e;
	        }
        });
    });
    child.stderr.on('data', function(data) {
        console.log('Error', data.toString());
    });
}