function getQuotedKey(key) {
                if (key.type === "Literal" && typeof key.value === "string") {
                    // If the key is already a string literal, don't replace the quotes with double quotes.
                    return sourceCode.getText(key);
                }
                // Otherwise, the key is either an identifier or a number literal.
                return `"${key.type === "Identifier" ? key.name : key.value}"`;
            }