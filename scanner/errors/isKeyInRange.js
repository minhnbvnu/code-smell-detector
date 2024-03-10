function isKeyInRange (key, range, checkCached) {
    let lowerMatch = range.lower === undefined;
    let upperMatch = range.upper === undefined;
    const encodedKey = encode(key, true);
    const lower = checkCached ? range.__lowerCached : encode(range.lower, true);
    const upper = checkCached ? range.__upperCached : encode(range.upper, true);

    if (!lowerMatch && (
        (range.lowerOpen &&
            encodedKey !== null && lower !== null && encodedKey > lower) ||
        (!range.lowerOpen && (
            (!encodedKey && !lower) ||
            (encodedKey !== null && lower !== null && encodedKey >= lower))
        )
    )) {
        lowerMatch = true;
    }
    if (!upperMatch && (
        (range.upperOpen &&
            encodedKey !== null && upper !== null && encodedKey < upper) ||
        (!range.upperOpen && (
            (!encodedKey && !upper) ||
            (encodedKey !== null && upper !== null && encodedKey <= upper))
        )
    )) {
        upperMatch = true;
    }

    return lowerMatch && upperMatch;
}