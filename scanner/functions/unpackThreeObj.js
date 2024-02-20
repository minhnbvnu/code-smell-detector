function unpackThreeObj(value, manager) {
    var resolvePromisesDict = require('@jupyter-widgets/base/lib/utils').resolvePromisesDict;
    var unpacked;
    if (Array.isArray(value)) {
        unpacked = [];
        value.forEach(function(sub_value) {
            unpacked.push(unpackThreeObj(sub_value, manager));
        });
        return Promise.all(unpacked);
    } else if (value instanceof Object) {
        unpacked = {};
        Object.keys(value).forEach(function(key) {
            unpacked[key] = unpackThreeObj(value[key], manager);
        });
        return resolvePromisesDict(unpacked);
    } else if (typeof value === 'string' && value.slice(0, 10) === 'IPY_MODEL_') {
        // get_model returns a promise already
        return manager.get_model(value.slice(10, value.length)).then(function (model) {
            return model.initPromise.then(function() {
                return model.obj;
            });
        });
    } else {
        return Promise.resolve(value);
    }
}