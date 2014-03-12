/**
 * x ? I dont want name this module YAN(yet another name), So, :- ( , let
 * it be x temporary.  Feel sorry for my Chinese language teacher.
 */
var X = window.X || {};;
(function() {
    var modules = {};
    var require = function(moduleName) {
        var module = modules[moduleName];
        if(module.exports){
            return module.exports;
        }
    };

    var define = function(moduleName, func) {
        var module = {
            exports: {},
            name: moduleName
        };
        modules[moduleName] = module;
        var res = func.apply(null, [require, module.exports, module]);
    };
    
    /**
     * util
     */
    define('util', function(require, exports, module) {
        var util = {};
        var div = typeof document != "undefined" && document.createElement("div");
        var hasOwn = Object.prototype.hasOwnProperty;
        var mix = util.mix = function(obj, trait, isCoverOriginMethod) {
            for (var attr in trait) {
                if (hasOwn.call(trait, attr) && !(isCoverOriginMethod && obj[attr])) {
                    obj[attr] = trait[attr];
                }
            }
        }
        module.exports = util;
    });


    /**
     * asyn
     */
    define('asyn', function(require, exports, module) {
        /**
         * @class -- Promise
         * @desc  -- Promise A+ 模型实现
         */
        function Promise(state) {
            if (!(this instanceof Promise)) {
                return new Promise(1);
            }
            //-- promise modle
            //== promise 三状态 pending(默认状态) ,fulfilled, rejected
            this._resolves = [];
            this._rejects = [];
            this._readyState = state || Promise.PENDING;
            this._data = null;
            this._reason = null;
        }
        mix(Promise, {
            PENDING: 0,
            FULFILLED: 1,
            REJECTED: 2,
            isPromise: function(obj) {
                return obj != null && typeof obj['then'] == 'function';
            }
        });
        /**
         * @class -- Defer
         * @desc  -- 负责promise的resolve和reject
         */
        function Defer() {
            this.promise = new Promise();
        }
        Defer.prototype = {
            resolve: function(data) {
                var promise = this.promise;
                if (promise._readyState != Promise.PENDING) {
                    return;
                }
                promise._readyState = Promise.FULFILLED;
                promise._data = data;
                promise._resolves.forEach(function(handler) {
                    handler(data);
                });
            },
            reject: function(reason) {
                var promise = this.promise;
                if (promise._readyState != Promise.PENDING) {
                    return;
                }
                promise._readyState = Promise.REJECTED;
                promise._reason = reason;
                var handler = promise._rejects[0];
                if (handler) {
                    handler(reason);
                }
            }
        };

        function mix(a, b) {
            for (attr in b) {
                a[attr] = b[attr];
            }
        }
        var PromiseProto = Promise.prototype;
        PromiseProto.then = function(onFulfilled, onRejected) {
            var deferred = new Defer();
            if (this._readyState === Promise.PENDING) {
                this._resolves.push(fulfill);
                if (onRejected) {
                    this._rejects.push(onRejected);
                } else {
                    //为了让reject向后传递 
                    this._rejects.push(function(reason) {
                        deferred.reject(reason);
                    });
                }
                return deferred.promise;
            } else if (this._readyState === Promise.FULFILLED) {
                var self = this;
                return fulfill(self._data);
            }

            function fulfill(data) {
                var ret = onFulfilled ? onFulfilled(data) : data;
                if (Promise.isPromise(ret)) {
                    ret.then(function(data) {
                        deferred.resolve(data);
                    });
                    return deferred.promise
                } else {
                    deferred.resolve(ret);
                    return ret;
                }
            }
        }
        PromiseProto.otherwise = function(onRejected) {
            return this.then(undefined, onRejected);
        }
        PromiseProto.defer = function() {
            return new Defer();
        }
        PromiseProto.all = function(promises) {
            var defer = new Defer();
            var n = 0,
                result = [];
            //--solver 里边的n表示完成的个数
            promises.forEach(function(promise) {
                promise.then(function(ret) {
                    result.push(ret);
                    if (n++ >= promises.length) {
                        defer.resolve(result);
                    }
                });
            });
            return defer.promise;
        }
        PromiseProto.any = function(promises) {
            var defer = new Defer();
            promises.forEach(function(promise) {
                promise.then(function(ret) {
                    defer.resolve(ret);
                });
            });
            return defer.promise;
        }
        module.exports = {
            Promise: Promise,
            Defer: Defer
        };
    });
    /**
     * asynQueue
     */
    define('asynTaskQueue', function(require, exports, module) {
        var asyn = require('asyn');
        var util = require('util');
        var Promise = asyn.Promise;
        var Defer = asyn.Defer;

        function AsynTaskQueue(isNeedRunAtInitial) {
            this.defer = new Defer();
            this.promise = this.defer.promise;
            if (isNeedRunAtInitial) {
                this.run();
            }
        }
        util.mix(AsynTaskQueue.prototype, {
            push: function(task) {
                task = wrapTask(task);
                this.promise = this.promise.then(task);
                return this;
            },
            run: function() {
                this.defer.resolve();
            }
        });

        function wrapTask(task) {
            var defer = new Defer();
            return function() {
                task.call(this, defer);
                return defer.promise;
            }
        }
        module.exports = AsynTaskQueue;
    });
    /**
     * robot
     */
    /**
     * @desc:  Promise, simulate user ations
     * @author: chenxuejia
     * @email: chenxuejia67@gmail.com
     * @usage:
     *
     *     click, wait, tilhas, ok
     *         Promise().click("#btn").wait(1).dblclick("#newBtn").tilhas("#someDom").do(action).wait(3).ok();
     *
     *     repeat
     *         Promise().repeat(4, action, 2000).do(action).ok();
     *         Promise().repeat(1, [action1, action2, action3], 2000)
     */
    define('elf', function(require, exports, module) {
        // 通过 require 引入依赖
        var Task = require('asynTaskQueue');

        function Elf() {
            if (!(this instanceof Elf)) {
                return new Elf();
            }
            this.task = new Task(true);
        }
        var ElfProto = Elf.prototype;
        ElfProto.click = function(id, options) {
            this.task.push(function(defer) {
                $(id).simulate('click', options || findElementCenter(id));
                setTimeout(function() {
                    defer.resolve();
                }, 10);
            });
            return this;
        }
        ElfProto.mouseover = function(id, options) {
            this.task.push(function(defer) {
                $(id).simulate('mouseover', options || findElementCenter(id));
                setTimeout(function() {
                    defer.resolve();
                }, 10);
            });
            return this;
        }
        ElfProto.mouseout = function(id, options) {
            this.task.push(function(defer) {
                $(id).simulate('mouseout', options || findElementCenter(id));
                setTimeout(function() {
                    defer.resolve();
                }, 10);
            });
            return this;
        }
        ElfProto.select = ElfProto.input = function(id, value, time) {
            this.task.push(function(defer) {
                $(id).val(value);
                $(id).change();
                setTimeout(function() {
                    defer.resolve();
                }, time ? time * 1000 : 10)
            });
            return this;
        }
        ElfProto.wait = function(seconds) {
            this.task.push(function(defer) {
                setTimeout(function() {
                    defer.resolve();
                }, seconds * 1000);
            });
            return this;
        }
        ElfProto.then = function(func) {
            this.task.push(function(defer) {
                func();
                defer.resolve();
            });
            return this;
        }

        function findElementCenter(elem) {
            var offset,
                document = $(elem.ownerDocument);
            elem = $(elem);

            if(elem.length == 0){
                return {clientX: 0, clientY: 0};
            }

            offset = elem.offset();
            return {
                clientX: offset.left + elem.outerWidth() / 2 - document.scrollLeft(),
                clientY: offset.top + elem.outerHeight() / 2 - document.scrollTop()
            };
        }
        module.exports = Elf;
    });

    X.Elf =  require('elf');
})();