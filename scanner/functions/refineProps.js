function refineProps(rawProps, processors, defaults, leftoverProps) {
        if (defaults === void 0) { defaults = {}; }
        var refined = {};
        for (var key in processors) {
            var processor = processors[key];
            if (rawProps[key] !== undefined) {
                // found
                if (processor === Function) {
                    refined[key] = typeof rawProps[key] === 'function' ? rawProps[key] : null;
                }
                else if (processor) { // a refining function?
                    refined[key] = processor(rawProps[key]);
                }
                else {
                    refined[key] = rawProps[key];
                }
            }
            else if (defaults[key] !== undefined) {
                // there's an explicit default
                refined[key] = defaults[key];
            }
            else {
                // must compute a default
                if (processor === String) {
                    refined[key] = ''; // empty string is default for String
                }
                else if (!processor || processor === Number || processor === Boolean || processor === Function) {
                    refined[key] = null; // assign null for other non-custom processor funcs
                }
                else {
                    refined[key] = processor(null); // run the custom processor func
                }
            }
        }
        if (leftoverProps) {
            for (var key in rawProps) {
                if (processors[key] === undefined) {
                    leftoverProps[key] = rawProps[key];
                }
            }
        }
        return refined;
    }