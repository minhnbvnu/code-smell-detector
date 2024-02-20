function hookRequire(matcher, transformer, options) {
    options = options || {};
    let disable = false;
    const fn = transformFn(matcher, transformer, options.verbose);
    const postLoadHook =
        options.postLoadHook && typeof options.postLoadHook === 'function'
            ? options.postLoadHook
            : null;

    const extensions = options.extensions || ['.js'];

    extensions.forEach(ext => {
        appendTransform((code, filename) => {
            if (disable) {
                return code;
            }
            const ret = fn(code, filename);
            if (postLoadHook) {
                postLoadHook(filename);
            }
            return ret.code;
        }, ext);
    });

    return function() {
        disable = true;
    };
}