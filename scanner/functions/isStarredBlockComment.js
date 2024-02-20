function isStarredBlockComment([firstComment]) {
                if (firstComment.type !== "Block") {
                    return false;
                }
                const lines = firstComment.value.split(astUtils.LINEBREAK_MATCHER);
                // The first and last lines can only contain whitespace.
                return lines.length > 0 && lines.every((line, i) => (i === 0 || i === lines.length - 1 ? /^\s*$/u : /^\s*\*/u).test(line));
            }