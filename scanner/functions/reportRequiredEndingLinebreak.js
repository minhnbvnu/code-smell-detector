function reportRequiredEndingLinebreak(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: "missingClosingLinebreak",
                    fix(fixer) {
                        return fixer.insertTextBefore(token, "\n");
                    }
                });
            }