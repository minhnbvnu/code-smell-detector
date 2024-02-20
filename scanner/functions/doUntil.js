function doUntil(fn, test, callback) {
    doWhilst(fn, function () {
        return !test.apply(this, arguments);
    }, callback);
}