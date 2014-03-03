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
	    .use(connect.static(publicPath, {
	        maxAge: 60 * 60 * 1000,
	        hidden: false
	    }));
}

function initServer() {
    server = http.createServer(app);
}

function initSocket() {
    console.log('init socket');
    io = SocketIO.listen(server, {
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