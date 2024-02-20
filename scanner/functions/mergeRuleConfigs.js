function mergeRuleConfigs(target, source) {
        if (!isNonNullObject(source)) {
            return;
        }
        for (const key of Object.keys(source)) {
            if (key === "__proto__") {
                continue;
            }
            const targetDef = target[key];
            const sourceDef = source[key];
            // Adopt the rule config which was found at first.
            if (targetDef === void 0) {
                if (Array.isArray(sourceDef)) {
                    target[key] = [...sourceDef];
                }
                else {
                    target[key] = [sourceDef];
                }
                /*
                 * If the first found rule config is severity only and the current rule
                 * config has options, merge the severity and the options.
                 */
            }
            else if (targetDef.length === 1 &&
                Array.isArray(sourceDef) &&
                sourceDef.length >= 2) {
                targetDef.push(...sourceDef.slice(1));
            }
        }
    }