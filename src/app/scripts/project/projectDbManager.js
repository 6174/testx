/**
 * project db
 */
var path = require('path'),
    fs = require('fs-extra');

var dbsrc = path.join(__dirname, '../../database/', 'projectsdb.json');

function save(data, handler, thisObj) {
    fs.outputJson(dbsrc, data, function(err) {
        if (err) {
            mediator.emit('project-save-error', err);
        }else{
        	handler && handler.call(thisObj);
        }
    });
}

function fetch(handler, thisObj) {
    fs.readJson(dbsrc, function(err, data) {
        if (err) {
            mediator.emit('project-fetch-error', err);
        }else{
	        handler.call(thisObj, data);
        }
    });
}

module.exports = {
	save: save,
	fetch: fetch
};