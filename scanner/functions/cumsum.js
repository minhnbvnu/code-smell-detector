function cumsum(array) {
        const result = new array.constructor(array.length);
        reduce(array, (a, b, i) => result[i] = a + b, 0);
        return result;
    }