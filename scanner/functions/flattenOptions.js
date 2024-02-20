function flattenOptions(options) {
    if (options !== Object(options)) {
        return {
            capture: Boolean(options),
            once: false,
            passive: false
        };
    }
    return {
        capture: Boolean(options.capture),
        once: Boolean(options.once),
        passive: Boolean(options.passive)
    };
}