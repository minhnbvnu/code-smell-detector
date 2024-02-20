function fail_helper(name) {
    return function() {
        throw new Error(name);
    };
}