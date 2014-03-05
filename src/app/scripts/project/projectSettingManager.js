/**
 * project setting manager
 */
var path = require('path'),
	fs = require('fs-extra');


var defaultConfig = {
	broswer: 'chrome',
	testFramework: 'jasmine',
	url: 'http://localhost:80',
	proxy: true
}

function parseProjectConfig(dirname){
	var str, data, src;

	if(!fs.existsSync(dirname)){
		return null;
	}

	src = path.join(dirname, 'config.json');

	if(!fs.existsSync(src)){
		return defaultConfig;
	}
	
	str = fs.readFileSync(src);

	try {
		data = JSON.parse(str); 
	} catch (err) {
		mediator.emit('loading-project-error', {
			error: 'json format error!'
		});
		return defaultConfig;
	}

	for(attr in defaultConfig){
		data[attr] = data[attr] || defaultConfig[attr];
	}

	return data;
}

module.exports = {
	getProjectSetting: parseProjectConfig
};