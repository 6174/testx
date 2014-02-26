/**
 * just some test snnipets
 */

var events = require('events'),
	util = require('util');

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