function doParallel(fn) {
    return function (obj, iteratee, callback) {
        return fn(eachOf, obj, iteratee, callback);
    };
}