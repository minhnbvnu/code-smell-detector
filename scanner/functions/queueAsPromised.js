function queueAsPromised(context, worker, concurrency) {
        if (typeof context === 'function') {
            concurrency = worker;
            worker = context;
            context = null;
        }
        function asyncWrapper(arg, cb) {
            worker.call(this, arg)
                .then(function (res) {
                cb(null, res);
            }, cb);
        }
        var queue = fastqueue(context, asyncWrapper, concurrency);
        var pushCb = queue.push;
        var unshiftCb = queue.unshift;
        queue.push = push;
        queue.unshift = unshift;
        queue.drained = drained;
        return queue;
        function push(value) {
            var p = new Promise(function (resolve, reject) {
                pushCb(value, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
            // Let's fork the promise chain to
            // make the error bubble up to the user but
            // not lead to a unhandledRejection
            p.catch(noop);
            return p;
        }
        function unshift(value) {
            var p = new Promise(function (resolve, reject) {
                unshiftCb(value, function (err, result) {
                    if (err) {
                        reject(err);
                        return;
                    }
                    resolve(result);
                });
            });
            // Let's fork the promise chain to
            // make the error bubble up to the user but
            // not lead to a unhandledRejection
            p.catch(noop);
            return p;
        }
        function drained() {
            if (queue.idle()) {
                return new Promise(function (resolve) {
                    resolve();
                });
            }
            var previousDrain = queue.drain;
            var p = new Promise(function (resolve) {
                queue.drain = function () {
                    previousDrain();
                    resolve();
                };
            });
            return p;
        }
    }