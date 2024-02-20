function uncurryThis(f) {
    return function () {
        return call.apply(f, arguments);
    };
}