function validateString(node, match) {
                const isTemplateElement = node.type === "TemplateElement";
                const escapedChar = match[0][1];
                let isUnnecessaryEscape = !VALID_STRING_ESCAPES.has(escapedChar);
                let isQuoteEscape;
                if (isTemplateElement) {
                    isQuoteEscape = escapedChar === "`";
                    if (escapedChar === "$") {
                        // Warn if `\$` is not followed by `{`
                        isUnnecessaryEscape = match.input[match.index + 2] !== "{";
                    }
                    else if (escapedChar === "{") {
                        /*
                         * Warn if `\{` is not preceded by `$`. If preceded by `$`, escaping
                         * is necessary and the rule should not warn. If preceded by `/$`, the rule
                         * will warn for the `/$` instead, as it is the first unnecessarily escaped character.
                         */
                        isUnnecessaryEscape = match.input[match.index - 1] !== "$";
                    }
                }
                else {
                    isQuoteEscape = escapedChar === node.raw[0];
                }
                if (isUnnecessaryEscape && !isQuoteEscape) {
                    report(node, match.index, match[0].slice(1));
                }
            }