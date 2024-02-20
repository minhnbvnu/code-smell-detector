function random_value(t, rng) {
    const T = typeof t;
    if (Array.isArray(t) || (T === 'string')) {
        return t[random_integer(0, t.length - 1, rng)];
    } else if (T === 'object') {
        const k = keys(t);

        if (k.length === 0) {
            return undefined;
        } else {
            return t[k[random_integer(0, k.length - 1, rng)]];
        }
    } else {
        return undefined;
    }
}