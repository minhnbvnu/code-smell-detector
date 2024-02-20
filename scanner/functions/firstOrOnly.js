function firstOrOnly(valueOrArray) {
            return isArray(valueOrArray) ? first(valueOrArray) : valueOrArray;
        }