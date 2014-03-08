/**
 * 注入浏览器的脚本代码
 */
(function() {
    var socket = io.connect('http://localhost:5051');
    // socket.on('connect', function() {
    // socket.emit('', 'I am chenxuejia ! haha!');
    // });
    //{emit: function(){}, on: function(){}};//
    var addListener = window.addEventListener ? function(obj, evt, cb) {
            obj.addEventListener(evt, cb, false)
        } : function(obj, evt, cb) {
            obj.attachEvent('on' + evt, cb)
        }
    window.Injector = {
        useCustomAdapter: function(adapter) {
            adapter(socket)
        },
        emit: function(evt) {
            socket.emit.apply(socket, arguments)
            if (this.evtHandlers && this.evtHandlers[evt]) {
                var handlers = this.evtHandlers[evt]
                var args = Array.prototype.slice.call(arguments, 1)
                for (var i = 0; i < handlers.length; i++) {
                    var handler = handlers[i]
                    handler.apply(this, args)
                }
            }
        },
        on: function(evt, callback) {
            if (!this.evtHandlers) {
                this.evtHandlers = {}
            }
            if (!this.evtHandlers[evt]) {
                this.evtHandlers[evt] = []
            }
            this.evtHandlers[evt].push(callback)
        },
        handleConsoleMessage: function() {}
    };
    window.emit = function emit() {
        Injector.emit.apply(Injector, arguments);
    }
    init();

    function init() {
        takeOverConsole();
        interceptWindowOnError();
        var id = 10;
        socket.emit('browser-login', getBrowserName(navigator.userAgent), id)
        socket.on('connect', function() {
            connectStatus = 'connected'
        });
        socket.on('disconnect', function() {
            connectStatus = 'disconnected'
        });
        // socket.on('reconnect', startTests)
        // socket.on('start-tests', startTests)
        initTestFrameworkHooks()
        // addListener(window, 'load', initUI)
        setupTestStats()
    }

    function takeOverConsole() {
        var console = window.console
        if (!console) {
            console = window.console = {
                log: function() {},
                warn: function() {},
                error: function() {},
                info: function() {}
            }
        }
        var methods = ['log', 'warn', 'error', 'info']
        for (var i = 0; i < methods.length; i++) {
            intercept(methods[i])
        }

        function intercept(method) {
            var original = console[method]
            console[method] = function() {
                var message = stringifyArgs(arguments)
                socket.emit('client-log', {
                    message: message,
                    method: method
                });
                 
                if (original && original.apply) {
                    // Do this for normal browsers
                    original.apply(console, arguments)
                } else if (original) {
                    // Do this for IE
                    original(message)
                }
                 
            }
        }
    }

    function interceptWindowOnError() {
        window.onerror = function(msg, url, line) {
            // if (typeof msg === 'string' && typeof url === 'string' && typeof line === 'number') {
            socket.emit('client-error',{
                message: msg,
                url: url,
                line: line
            });
            // }
        }
    }

    function initTestFrameworkHooks() {
        if (typeof getJasmineRequireObj === 'function') {
            jasmine2Adapter(socket)
        } else if (typeof jasmine === 'object') {
            jasmineAdapter(socket)
        } else if ((typeof mocha).match(/function|object/)) {
            mochaAdapter(socket)
        } else if (typeof QUnit === 'object') {
            qunitAdapter(socket)
        } else if (typeof buster !== 'undefined') {
            busterAdapter(socket)
        }
    }

    function setupTestStats() {
        var originalTitle = document.title
        var total = 0
        var passed = 0
        Injector.on('test-result', function(test) {
            total++
            if (test.failed === 0) passed++
            updateTitle()
        });

        function updateTitle() {
            if (!total) return
            document.title = originalTitle + ' (' + passed + '/' + total + ')'
        }
    }

    function getBrowserName(userAgent) {
        var regexs = [/MS(?:(IE) (1?[0-9]\.[0-9]))/, [/(OPR)\/([0-9]+\.[0-9]+)/,
                function(m) {
                    return ['Opera', m[2]].join(' ')
                }
            ], /(Opera).*Version\/([0-9]+\.[0-9]+)/, /(Chrome)\/([0-9]+\.[0-9]+)/, /(Firefox)\/([0-9a-z]+\.[0-9a-z]+)/, /(PhantomJS)\/([0-9]+\.[0-9]+)/, [/(Android).*Version\/([0-9]+\.[0-9]+).*(Safari)/,
                function(m) {
                    return [m[1], m[3], m[2]].join(' ')
                }
            ],
            [/(iPhone).*Version\/([0-9]+\.[0-9]+).*(Safari)/,
                function(m) {
                    return [m[1], m[3], m[2]].join(' ')
                }
            ],
            [/(iPad).*Version\/([0-9]+\.[0-9]+).*(Safari)/,
                function(m) {
                    return [m[1], m[3], m[2]].join(' ')
                }
            ],
            [/Version\/([0-9]+\.[0-9]+).*(Safari)/,
                function(m) {
                    return [m[2], m[1]].join(' ')
                }
            ]
        ]
        for (var i = 0; i < regexs.length; i++) {
            var regex = regexs[i]
            var pick = function(m) {
                return m.slice(1).join(' ')
            }
            if (regex instanceof Array) {
                pick = regex[1]
                regex = regex[0]
            }
            var match = userAgent.match(regex)
            if (match) {
                return pick(match)
            }
        }
        return userAgent
    }

    function stringifyArgs(args) {
        var strings = []
        for (var i = 0; i < args.length; i++) {
            strings.push(stringify(args[i]))
        }
        return strings.join(' ')
    }

    function stringify(obj, fn, spaces) {
        if (typeof obj === 'string') return obj
        try {
            return JSON.stringify(obj)
        } catch (e) {
            return '' + obj
        }
    }
})();