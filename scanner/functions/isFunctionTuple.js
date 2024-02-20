function isFunctionTuple(a) {
    return _.isArray(a) &&
        a.length === 2 &&
        _.isObject(a[0]) &&
        _.isFunction(a[1]);
}