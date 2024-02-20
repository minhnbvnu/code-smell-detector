function verifyNonWordsDontHaveSpaces(node, firstToken, secondToken) {
                if (node.prefix) {
                    if (secondToken.range[0] > firstToken.range[1]) {
                        context.report({
                            node,
                            messageId: "unexpectedAfter",
                            data: {
                                operator: firstToken.value
                            },
                            fix(fixer) {
                                if (astUtils.canTokensBeAdjacent(firstToken, secondToken)) {
                                    return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
                                }
                                return null;
                            }
                        });
                    }
                }
                else {
                    if (secondToken.range[0] > firstToken.range[1]) {
                        context.report({
                            node,
                            messageId: "unexpectedBefore",
                            data: {
                                operator: secondToken.value
                            },
                            fix(fixer) {
                                return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
                            }
                        });
                    }
                }
            }