function checkExtraNonNullAssertion(node) {
                context.report({
                    node,
                    messageId: 'noExtraNonNullAssertion',
                    fix(fixer) {
                        return fixer.removeRange([node.range[1] - 1, node.range[1]]);
                    },
                });
            }