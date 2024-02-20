function _union(arrays) {
        const result = new Set();
        for (const array of arrays) {
            for (const value of array) {
                result.add(value);
            }
        }
        return result;
    }