function memoizedBinarySearch(haystack, needle, state, key) {
            const { lastKey, lastNeedle, lastIndex } = state;
            let low = 0;
            let high = haystack.length - 1;
            if (key === lastKey) {
                if (needle === lastNeedle) {
                    found = lastIndex !== -1 && haystack[lastIndex][COLUMN$1] === needle;
                    return lastIndex;
                }
                if (needle >= lastNeedle) {
                    // lastIndex may be -1 if the previous needle was not found.
                    low = lastIndex === -1 ? 0 : lastIndex;
                }
                else {
                    high = lastIndex;
                }
            }
            state.lastKey = key;
            state.lastNeedle = needle;
            return (state.lastIndex = binarySearch(haystack, needle, low, high));
        }