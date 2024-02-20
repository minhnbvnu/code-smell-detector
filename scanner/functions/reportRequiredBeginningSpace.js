function reportRequiredBeginningSpace(node, token) {
                context.report({
                    node,
                    loc: token.loc,
                    messageId: 'requireSpaceAfter',
                    data: {
                        token: token.value,
                    },
                    fix(fixer) {
                        return fixer.insertTextAfter(token, ' ');
                    },
                });
            }