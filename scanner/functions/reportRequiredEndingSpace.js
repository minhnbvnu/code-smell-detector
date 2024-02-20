function reportRequiredEndingSpace(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: 'requireSpaceBefore',
                    data: {
                        token: token.value,
                    },
                    fix(fixer) {
                        return fixer.insertTextBefore(token, ' ');
                    },
                });
            }