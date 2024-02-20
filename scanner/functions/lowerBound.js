function lowerBound(haystack, needle, index) {
            for (let i = index - 1; i >= 0; i--, index--) {
                if (haystack[i][COLUMN$1] !== needle)
                    break;
            }
            return index;
        }