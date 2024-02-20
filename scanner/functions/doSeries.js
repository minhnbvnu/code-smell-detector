function doSeries(fn) {
    return function (obj, iteratee, callback) {
        return fn(eachOfSeries, obj, iteratee, callback);
    };
}