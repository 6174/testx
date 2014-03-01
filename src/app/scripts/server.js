/**
 * socket and static file server
 */
var SocketIO = require('socket.io'),
    connect = require('connect'),
    path = require('path'),
    http = require('http');
var app, server, io;

function start(conf) {
    initApp();
    initServer();
    initSocket();
    server.listen(5051);
}

function initApp() {
    var publicPath = path.join(__dirname, '../assets/public');
    app = connect()
	    .use(function(req, res, next) {
	        // Website you wish to allow to connect
	        res.setHeader('Access-Control-Allow-Origin', '*:*');
	        // Request methods you wish to allow
	        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	        // Request headers you wish to allow
	        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	    })
	    .use(connect.static(publicPath, {
	        maxAge: 60 * 60 * 1000,
	        hidden: false
	    }));
}

function initServer() {
    server = http.createServer(app);
}

function initSocket() {
    io = SocketIO.listen(app, {
        origins: '*:*'
    });
    // io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
    io.sockets.on('connection', function(socket) {
        socket.emit('news', {
            hello: 'world'
        });
        socket.on('hello-dandan', function(data) {
            window.alert(data);
        });
    });
}
module.exports = {
    start: start
};