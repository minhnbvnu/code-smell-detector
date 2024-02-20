function callbackAsync(callback, error, result) {
        setImmediate(function () { callback(error, result); });
    }