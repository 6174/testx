/**
 * socket and static file server
 */
var SocketIO = require('socket.io'),
    connect = require('connect'),
    path = require('path'),
    http = require('http'),
    spliter = '#####';
var app, server, io;

(function start(conf) {
    process.stdin.resume();
    initApp();
    initServer();
    initSocket();
    initParentProcessCommand();
    server.listen(5051);
})();

function initApp() {
    var publicPath = path.join(__dirname, '../../assets/public');
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
    io = SocketIO.listen(server, {
        origins: '*:*'
    });
    // io.set('transports', ['websocket', 'flashsocket', 'htmlfile', 'xhr-polling', 'jsonp-polling']);
    io.sockets.on('connection', function(socket) {
        socket.emit('news', {
            hello: 'world'
        });

        socket.on('client-log', function(data){
            data.ev = 'handle-client-log';
            process.stdout.write(JSON.stringify(data) + spliter);
        });

        socket.on('spec-done', function(data){
            // mediator.emit('handle-test-result', data);
            data.ev = 'handle-test-result';
            process.stdout.write(JSON.stringify(data) + spliter);
        });

        socket.on('suit-start', function(data){
            // mediator.emit('handle-test-suit', data);
            data.ev = 'handle-test-suit';
            process.stdout.write(JSON.stringify(data) + spliter);
        });

        socket.on('suit-done', function(data){
            // mediator.emit('handle-suit-done');
            data.ev = 'handle-suit-done';
            process.stdout.write(JSON.stringify(data) + spliter);
        });

        socket.on('tests-done', function(data){
            // mediator.emit('handle-all-test-results', data);
            // mediator.emit('quit-broswer');
            data.ev = 'handle-all-test-results';
            process.stdout.write(JSON.stringify(data) + spliter);
        });
    });
}

function initParentProcessCommand(){
    process.stdin.on('data', function(){
    });
}