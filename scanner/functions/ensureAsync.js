function ensureAsync(fn) {
    return initialParams(function (args, callback) {
        var sync = true;
        args.push(function () {
            var innerArgs = arguments;
            if (sync) {
                setImmediate$1(function () {
                    callback.apply(null, innerArgs);
                });
            } else {
                callback.apply(null, innerArgs);
            }
        });
        fn.apply(this, args);
        sync = false;
    });
}