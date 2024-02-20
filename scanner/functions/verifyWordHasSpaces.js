function verifyWordHasSpaces(node, firstToken, secondToken, word) {
                if (secondToken.range[0] === firstToken.range[1]) {
                    context.report({
                        node,
                        messageId: "wordOperator",
                        data: {
                            word
                        },
                        fix(fixer) {
                            return fixer.insertTextAfter(firstToken, " ");
                        }
                    });
                }
            }