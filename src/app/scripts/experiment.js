/**
 * just some test snnipets
 */

var events = require('events'),
	util = require('util'),
	fs = require('fs-extra'),
	path = require('path');

function testUtilAndEvent() {
	//-- test nodejs's util and Event
	console.log(util.inspect({
		a: 'as',
		b: {
			c: "asd",
			d: "asdf",
			e: {
				f: "asdf"
			}
		},
		c: ['12', '23', {
			b: 'asd'
		}]
	}));

	var eventEmitter = new events.EventEmitter();
	eventEmitter.on('haha', function(ev) {
		console.log('haha fired: ', util.inspect(ev));
	});

	eventEmitter.emit('haha', {
		'I': 'was a visitor'
	});
}

function testEjs(){
	var ejs = require('ejs');
	var src = path.join(__dirname, '../templates/test.html');
	var ret = ejs.render(String(fs.readFileSync(src)), {
		user: {name: 'xuejia & dandan'},
		helpert: function(str){
			return 'xuejia love dandan';
		}
	});
	$('#TxRightPanel').text(ret);
}


function testUilog(){
	uilog('log data from your test scripts!');
}

testUilog();

