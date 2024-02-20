function removeEmptyFinalLines(mappings) {
            const { length } = mappings;
            let len = length;
            for (let i = len - 1; i >= 0; len = i, i--) {
                if (mappings[i].length > 0)
                    break;
            }
            if (len < length)
                mappings.length = len;
        }