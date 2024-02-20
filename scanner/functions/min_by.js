function min_by(array, key) {
        if (array.length == 0)
            throw new Error("min_by() called with an empty array");
        let result = array[0];
        let resultComputed = key(result);
        for (let i = 1, length = array.length; i < length; i++) {
            const value = array[i];
            const computed = key(value);
            if (computed < resultComputed) {
                result = value;
                resultComputed = computed;
            }
        }
        return result;
    }