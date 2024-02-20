function forbidComma(node) {
                const last = getLastItem(node);
                const trailing = getTrailingToken(node);
                if (last && trailing && util.isCommaToken(trailing)) {
                    context.report({
                        node,
                        messageId: 'unexpected',
                        fix(fixer) {
                            return fixer.remove(trailing);
                        },
                    });
                }
            }