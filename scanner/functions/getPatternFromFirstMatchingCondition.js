function getPatternFromFirstMatchingCondition(target, conditions) {
            if (typeof target === "string") {
                return target;
            }
            if (target && typeof target === "object" && !isArray(target)) {
                for (const condition in target) {
                    if (condition === "default" || conditions.indexOf(condition) > -1 || isApplicableVersionedTypesKey(conditions, condition)) {
                        const pattern = target[condition];
                        return getPatternFromFirstMatchingCondition(pattern, conditions);
                    }
                }
            }
        }