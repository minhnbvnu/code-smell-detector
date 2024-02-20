function parseRegExpText(pattern, uFlag) {
                // Parse it.
                const ast = regexpp.parsePattern(pattern, undefined, undefined, uFlag);
                if (ast.alternatives.length !== 1) {
                    return null;
                }
                // Drop `^`/`$` assertion.
                const chars = ast.alternatives[0].elements;
                const first = chars[0];
                if (first.type === 'Assertion' && first.kind === 'start') {
                    chars.shift();
                }
                else {
                    chars.pop();
                }
                // Check if it can determine a unique string.
                if (!chars.every(c => c.type === 'Character')) {
                    return null;
                }
                // To string.
                return String.fromCodePoint(...chars.map(c => c.value));
            }