function mapPromiseFnOverObject(object, mapFn) {
    let promises = [];

    Object.keys(object).forEach(function(key) {
        const value = object[key];
        const result = mapFn(key, value);
        if (result instanceof Array) {
            promises = promises.concat(result);
        } else {
            promises.push(result);
        }
    }, this);

    return Promise.all(promises);
}