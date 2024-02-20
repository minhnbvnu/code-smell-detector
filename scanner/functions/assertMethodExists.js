function assertMethodExists(value, method, name, methodPath) {
    if (value[method] === null || value[method] === undefined) {
        throw new TypeError(
            "Expected " + name + " to have method " + methodPath
        );
    }
}