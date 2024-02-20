function arrayToMultiMap(values, makeKey, makeValue = identity) {
            const result = createMultiMap();
            for (const value of values) {
                result.add(makeKey(value), makeValue(value));
            }
            return result;
        }