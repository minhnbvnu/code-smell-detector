function assertExtraConfigTypes(extraConfigTypes) {
        if (extraConfigTypes.length > 2) {
            throw new TypeError('configTypes must be an array with at most two items.');
        }
        for (const configType of extraConfigTypes) {
            if (!CONFIG_TYPES.has(configType)) {
                throw new TypeError(`Unexpected config type "${configType}" found. Expected one of: "object", "array", "function".`);
            }
        }
    }