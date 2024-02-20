function reportRequiredBeginningLinebreak(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: "missingOpeningLinebreak",
                    fix(fixer) {
                        return fixer.insertTextAfter(token, "\n");
                    }
                });
            }