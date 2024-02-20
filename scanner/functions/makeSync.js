function makeSync(fs, name) {
    const fn = fs[`${name}Sync`];

    return function () {
        const callback = arguments[arguments.length - 1];
        const args = Array.prototype.slice.call(arguments, 0, -1);
        let ret;

        try {
            ret = fn.apply(fs, args);
        } catch (err) {
            return callback(err);
        }

        callback(null, ret);
    };
}