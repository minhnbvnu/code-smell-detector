function serializeMethods(o) {
    var v;

    for (var k in o) {
        v = o[k];

        if (_.isObject(v) && !_.isArray(v) && !_.isFunction(v)) {
            serializeMethods(v);
        } else {
            o[k] = serializeFunctions(v);
        }
    }
}