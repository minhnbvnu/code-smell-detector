function checkComputedProperty(node, value) {
                if (validIdentifier.test(value) &&
                    (allowKeywords || !keywords.includes(String(value))) &&
                    !(allowPattern && allowPattern.test(value))) {
                    const formattedValue = node.property.type === "Literal" ? JSON.stringify(value) : `\`${value}\``;
                    context.report({
                        node: node.property,
                        messageId: "useDot",
                        data: {
                            key: formattedValue
                        },
                        *fix(fixer) {
                            const leftBracket = sourceCode.getTokenAfter(node.object, astUtils.isOpeningBracketToken);
                            const rightBracket = sourceCode.getLastToken(node);
                            const nextToken = sourceCode.getTokenAfter(node);
                            // Don't perform any fixes if there are comments inside the brackets.
                            if (sourceCode.commentsExistBetween(leftBracket, rightBracket)) {
                                return;
                            }
                            // Replace the brackets by an identifier.
                            if (!node.optional) {
                                yield fixer.insertTextBefore(leftBracket, astUtils.isDecimalInteger(node.object) ? " ." : ".");
                            }
                            yield fixer.replaceTextRange([leftBracket.range[0], rightBracket.range[1]], value);
                            // Insert a space after the property if it will be connected to the next token.
                            if (nextToken &&
                                rightBracket.range[1] === nextToken.range[0] &&
                                !astUtils.canTokensBeAdjacent(String(value), nextToken)) {
                                yield fixer.insertTextAfter(node, " ");
                            }
                        }
                    });
                }
            }