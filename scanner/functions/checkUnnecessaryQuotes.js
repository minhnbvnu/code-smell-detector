function checkUnnecessaryQuotes(node) {
                const key = node.key;
                if (node.method || node.computed || node.shorthand) {
                    return;
                }
                if (key.type === "Literal" && typeof key.value === "string") {
                    let tokens;
                    try {
                        tokens = espree.tokenize(key.value);
                    }
                    catch {
                        return;
                    }
                    if (tokens.length !== 1) {
                        return;
                    }
                    const isKeywordToken = isKeyword(tokens[0].value);
                    if (isKeywordToken && KEYWORDS) {
                        return;
                    }
                    if (CHECK_UNNECESSARY && areQuotesRedundant(key.value, tokens, NUMBERS)) {
                        context.report({
                            node,
                            messageId: "unnecessarilyQuotedProperty",
                            data: { property: key.value },
                            fix: fixer => fixer.replaceText(key, getUnquotedKey(key))
                        });
                    }
                }
                else if (KEYWORDS && key.type === "Identifier" && isKeyword(key.name)) {
                    context.report({
                        node,
                        messageId: "unquotedReservedProperty",
                        data: { property: key.name },
                        fix: fixer => fixer.replaceText(key, getQuotedKey(key))
                    });
                }
                else if (NUMBERS && key.type === "Literal" && astUtils.isNumericLiteral(key)) {
                    context.report({
                        node,
                        messageId: "unquotedNumericProperty",
                        data: { property: key.value },
                        fix: fixer => fixer.replaceText(key, getQuotedKey(key))
                    });
                }
            }