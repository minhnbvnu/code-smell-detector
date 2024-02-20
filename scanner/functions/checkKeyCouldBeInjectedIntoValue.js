function checkKeyCouldBeInjectedIntoValue (value, keyPath) {
    const identifiers = keyPath.split('.');
    identifiers.pop();
    for (const identifier of identifiers) {
        if (!util.isObj(value)) {
            return false;
        }
        const hop = Object.hasOwn(value, identifier);
        if (!hop) {
            return true;
        }
        value = /** @type {{[key: string]: Value}} */ (value)[identifier];
    }
    return util.isObj(value);
}