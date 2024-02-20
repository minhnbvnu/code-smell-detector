function asyncWrapper(arg, cb) {
            worker.call(this, arg)
                .then(function (res) {
                cb(null, res);
            }, cb);
        }