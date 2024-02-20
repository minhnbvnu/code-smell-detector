function getErrorReporter(name) {
    try {
        return require("./reporters/" + name);
    } catch (e) {
        throw new Error(
            `Invalid reporter "${name}". Valid reporters are "gcc" and "pretty"`
        );
    }
}