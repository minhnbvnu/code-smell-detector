function validateFunction(fn, name) {
    if (typeof fn !== "function") {
        throw new Error(`Expected ${name} to be a function`);
    }
}