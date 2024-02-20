function verifyNonWordsHaveSpaces(node, firstToken, secondToken) {
                if (node.prefix) {
                    if (isFirstBangInBangBangExpression(node)) {
                        return;
                    }
                    if (firstToken.range[1] === secondToken.range[0]) {
                        context.report({
                            node,
                            messageId: "operator",
                            data: {
                                operator: firstToken.value
                            },
                            fix(fixer) {
                                return fixer.insertTextAfter(firstToken, " ");
                            }
                        });
                    }
                }
                else {
                    if (firstToken.range[1] === secondToken.range[0]) {
                        context.report({
                            node,
                            messageId: "beforeUnaryExpressions",
                            data: {
                                token: secondToken.value
                            },
                            fix(fixer) {
                                return fixer.insertTextBefore(secondToken, " ");
                            }
                        });
                    }
                }
            }