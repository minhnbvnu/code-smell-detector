function throw$(r) {
    return function() {
        throw r;
    };
}