function injectKeyIntoValueUsingKeyPath (value, key, keyPath) {
    const identifiers = keyPath.split('.');
    const last = identifiers.pop();
    identifiers.forEach((identifier) => {
        const hop = Object.hasOwn(value, identifier);
        if (!hop) {
            value[identifier] = {};
        }
        value = value[identifier];
    });
    value[/** @type {string} */ (last)] = key; // key is already a `keyValue` in our processing so no need to convert
}