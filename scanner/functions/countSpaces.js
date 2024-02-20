function countSpaces(tokens) {
                const before = tokens.arrow.range[0] - tokens.before.range[1];
                const after = tokens.after.range[0] - tokens.arrow.range[1];
                return { before, after };
            }