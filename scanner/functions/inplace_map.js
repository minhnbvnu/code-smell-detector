function inplace_map(array, fn, output) {
        const n = array.length;
        const result = output !== null && output !== void 0 ? output : array;
        for (let i = 0; i < n; i++) {
            result[i] = fn(array[i], i);
        }
    }