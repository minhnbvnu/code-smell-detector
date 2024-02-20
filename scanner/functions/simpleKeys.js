function simpleKeys(original) {
    return Object.keys(original).reduce(function (obj, key) {
        if (typeof original[key] !== 'object') {
            obj[key] = original[key];
        }
        return obj;
    }, {});
}