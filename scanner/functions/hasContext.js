function hasContext(options) {
        return (options.context && (typeof options.context == 'string' || typeof options.context == 'number'));
    }