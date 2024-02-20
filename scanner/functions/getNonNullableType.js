function getNonNullableType(type) {
                return strictNullChecks ? getAdjustedTypeWithFacts(type, 2097152 /* NEUndefinedOrNull */) : type;
            }