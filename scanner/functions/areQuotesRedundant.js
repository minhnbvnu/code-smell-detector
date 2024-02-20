function areQuotesRedundant(rawKey, tokens, skipNumberLiterals) {
                return tokens.length === 1 && tokens[0].start === 0 && tokens[0].end === rawKey.length &&
                    (["Identifier", "Keyword", "Null", "Boolean"].includes(tokens[0].type) ||
                        (tokens[0].type === "Numeric" && !skipNumberLiterals && String(+tokens[0].value) === tokens[0].value));
            }