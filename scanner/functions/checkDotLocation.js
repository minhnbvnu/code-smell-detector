function checkDotLocation(node) {
                const property = node.property;
                const dotToken = sourceCode.getTokenBefore(property);
                if (onObject) {
                    // `obj` expression can be parenthesized, but those paren tokens are not a part of the `obj` node.
                    const tokenBeforeDot = sourceCode.getTokenBefore(dotToken);
                    if (!astUtils.isTokenOnSameLine(tokenBeforeDot, dotToken)) {
                        context.report({
                            node,
                            loc: dotToken.loc,
                            messageId: "expectedDotAfterObject",
                            *fix(fixer) {
                                if (dotToken.value.startsWith(".") && astUtils.isDecimalIntegerNumericToken(tokenBeforeDot)) {
                                    yield fixer.insertTextAfter(tokenBeforeDot, ` ${dotToken.value}`);
                                }
                                else {
                                    yield fixer.insertTextAfter(tokenBeforeDot, dotToken.value);
                                }
                                yield fixer.remove(dotToken);
                            }
                        });
                    }
                }
                else if (!astUtils.isTokenOnSameLine(dotToken, property)) {
                    context.report({
                        node,
                        loc: dotToken.loc,
                        messageId: "expectedDotBeforeProperty",
                        *fix(fixer) {
                            yield fixer.remove(dotToken);
                            yield fixer.insertTextBefore(property, dotToken.value);
                        }
                    });
                }
            }