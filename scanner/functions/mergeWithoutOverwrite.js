function mergeWithoutOverwrite(target, source) {
        if (!isNonNullObject(source)) {
            return;
        }
        for (const key of Object.keys(source)) {
            if (key === "__proto__") {
                continue;
            }
            if (isNonNullObject(target[key])) {
                mergeWithoutOverwrite(target[key], source[key]);
            }
            else if (target[key] === void 0) {
                if (isNonNullObject(source[key])) {
                    target[key] = Array.isArray(source[key]) ? [] : {};
                    mergeWithoutOverwrite(target[key], source[key]);
                }
                else if (source[key] !== void 0) {
                    target[key] = source[key];
                }
            }
        }
    }