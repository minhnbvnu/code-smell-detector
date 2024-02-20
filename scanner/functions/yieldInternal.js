function yieldInternal(async, values) {
    function f() {
        var callback = arguments[arguments.length - 1];
        if (typeof callback !== "function") {
            throw new TypeError("Expected last argument to be a function");
        }
        if (async) {
            nextTick(function() {
                callback.apply(null, values);
            });
        } else {
            callback.apply(null, values);
        }
    }

    return wrapFunc(f);
}