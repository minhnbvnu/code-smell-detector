function mergeRegexFlags(flagsA, flagsB) {
                const flagsSet = new Set([
                    ...flagsA,
                    ...flagsB
                ]);
                return [...flagsSet].join("");
            }