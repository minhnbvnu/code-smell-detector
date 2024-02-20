function verifyWordDoesntHaveSpaces(node, firstToken, secondToken, word) {
                if (astUtils.canTokensBeAdjacent(firstToken, secondToken)) {
                    if (secondToken.range[0] > firstToken.range[1]) {
                        context.report({
                            node,
                            messageId: "unexpectedAfterWord",
                            data: {
                                word
                            },
                            fix(fixer) {
                                return fixer.removeRange([firstToken.range[1], secondToken.range[0]]);
                            }
                        });
                    }
                }
            }