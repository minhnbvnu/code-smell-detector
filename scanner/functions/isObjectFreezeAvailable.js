function isObjectFreezeAvailable() {
    if (!Object.freeze) {
        return false;
    }
    const foo = Object.freeze({});
    try {
        foo.bar = 1;
        return false;
    } catch (ex) {
        return true;
    }
}