function getCodePointData(string, i = 0) {
    const size = string.length;

    // Account for out-of-bounds indices:
    if (i < 0 || i >= size) {
        return null;
    }
    const first = string.charCodeAt(i);
    if (size > 1 && first >= HIGH_SURROGATE_BEGIN && first <= HIGH_SURROGATE_END) {
        const second = string.charCodeAt(i + 1);
        if (second >= LOW_SURROGATE_BEGIN && second <= LOW_SURROGATE_END) {
            // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
            return {
                code: (first - HIGH_SURROGATE_BEGIN) * 0x400 + second - LOW_SURROGATE_BEGIN + 0x10000,
                long: true
            };
        }
    }

    return {
        code: first,
        long: false
    };
}