function stringifyFunctions() {
    var self = this;
    return Object.keys(this).reduce(function(obj, key) {
        if (key !== 'toJSON') {
            obj[key] = /^function /.test(key)
                ? null // anon func: no point in saving because key itself is already the stringified function
                : self[key].toString() // stringify the function
                    .replace(/^function anonymous\(/, 'function(') // clean up Chromium artifact
                    .replace('\n/*``*/)', ')'); // clean up Chromium artifact
        }
        return obj;
    }, {});
}