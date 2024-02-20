function getNormalizedOptions(rawOptions, which) {
        return Object.assign({}, DEFAULTS, rawOptions[which] || rawOptions);
    }