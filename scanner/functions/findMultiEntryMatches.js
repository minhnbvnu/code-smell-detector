function findMultiEntryMatches (keyEntry, range) {
    const matches = [];

    if (Array.isArray(keyEntry)) {
        for (let key of keyEntry) {
            if (Array.isArray(key)) {
                if (range && range.lower === range.upper) {
                    continue;
                }
                if (key.length === 1) {
                    key = key[0];
                } else {
                    const nested = findMultiEntryMatches(key, range);
                    if (nested.length > 0) {
                        matches.push(key);
                    }
                    continue;
                }
            }

            if (util.isNullish(range) || isKeyInRange(key, range, true)) {
                matches.push(key);
            }
        }
    } else if (util.isNullish(range) || isKeyInRange(keyEntry, range, true)) {
        matches.push(keyEntry);
    }
    return matches;
}