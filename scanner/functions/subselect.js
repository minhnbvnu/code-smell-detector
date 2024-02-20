function subselect(array, indices) {
        const n = indices.length;
        const result = new array.constructor(n);
        for (let i = 0; i < n; i++) {
            result[i] = array[indices[i]];
        }
        return result;
    }