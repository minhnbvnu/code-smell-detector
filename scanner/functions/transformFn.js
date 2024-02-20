function transformFn(matcher, transformer, verbose) {
    return function(code, options) {
        options = options || {};

        // prior to 2.x, hookRequire returned filename
        // rather than object.
        if (typeof options === 'string') {
            options = { filename: options };
        }

        const shouldHook =
            typeof options.filename === 'string' &&
            matcher(path.resolve(options.filename));
        let transformed;
        let changed = false;

        if (shouldHook) {
            if (verbose) {
                console.error(
                    'Module load hook: transform [' + options.filename + ']'
                );
            }
            try {
                transformed = transformer(code, options);
                changed = true;
            } catch (ex) {
                console.error(
                    'Transformation error for',
                    options.filename,
                    '; return original code'
                );
                console.error(ex.message || String(ex));
                if (verbose) {
                    console.error(ex.stack);
                }
                transformed = code;
            }
        } else {
            transformed = code;
        }
        return { code: transformed, changed };
    };
}