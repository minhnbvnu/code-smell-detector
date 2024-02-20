function arrayToNumericMap(array, makeKey, makeValue = identity) {
            const result = [];
            for (const value of array) {
                result[makeKey(value)] = makeValue(value);
            }
            return result;
        }