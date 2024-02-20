function checkConsistency(node, checkQuotesRedundancy) {
                const quotedProps = [], unquotedProps = [];
                let keywordKeyName = null, necessaryQuotes = false;
                node.properties.forEach(property => {
                    const key = property.key;
                    if (!key || property.method || property.computed || property.shorthand) {
                        return;
                    }
                    if (key.type === "Literal" && typeof key.value === "string") {
                        quotedProps.push(property);
                        if (checkQuotesRedundancy) {
                            let tokens;
                            try {
                                tokens = espree.tokenize(key.value);
                            }
                            catch {
                                necessaryQuotes = true;
                                return;
                            }
                            necessaryQuotes = necessaryQuotes || !areQuotesRedundant(key.value, tokens) || KEYWORDS && isKeyword(tokens[0].value);
                        }
                    }
                    else if (KEYWORDS && checkQuotesRedundancy && key.type === "Identifier" && isKeyword(key.name)) {
                        unquotedProps.push(property);
                        necessaryQuotes = true;
                        keywordKeyName = key.name;
                    }
                    else {
                        unquotedProps.push(property);
                    }
                });
                if (checkQuotesRedundancy && quotedProps.length && !necessaryQuotes) {
                    quotedProps.forEach(property => {
                        context.report({
                            node: property,
                            messageId: "redundantQuoting",
                            fix: fixer => fixer.replaceText(property.key, getUnquotedKey(property.key))
                        });
                    });
                }
                else if (unquotedProps.length && keywordKeyName) {
                    unquotedProps.forEach(property => {
                        context.report({
                            node: property,
                            messageId: "requireQuotesDueToReservedWord",
                            data: { property: keywordKeyName },
                            fix: fixer => fixer.replaceText(property.key, getQuotedKey(property.key))
                        });
                    });
                }
                else if (quotedProps.length && unquotedProps.length) {
                    unquotedProps.forEach(property => {
                        context.report({
                            node: property,
                            messageId: "inconsistentlyQuotedProperty",
                            data: { key: property.key.name || property.key.value },
                            fix: fixer => fixer.replaceText(property.key, getQuotedKey(property.key))
                        });
                    });
                }
            }