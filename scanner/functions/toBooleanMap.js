function toBooleanMap(keys, defaultValue, displayName) {
        if (keys && !Array.isArray(keys)) {
            throw new Error(`${displayName} must be an array.`);
        }
        if (keys && keys.length > 0) {
            return keys.reduce((map, def) => {
                const [key, value] = def.split(":");
                if (key !== "__proto__") {
                    map[key] = value === void 0
                        ? defaultValue
                        : value === "true";
                }
                return map;
            }, {});
        }
        return void 0;
    }