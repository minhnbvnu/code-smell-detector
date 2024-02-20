function magnitude_squared(a) {
    if (typeof a === 'number') {
        let s = a * a;
        for (let i = 1; i < arguments.length; ++i) {
            s += arguments[i] * arguments[i];
        }
        return s;
    } else {
        return dot(a, a);
    }
}