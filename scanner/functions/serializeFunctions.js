function serializeFunctions(x) {
    if (_.isFunction(x)) {
        x = x.toString();
    } else if (isFunctionTuple(x)) {
        x[1] = x[1].toString();
    }

    return x;
}