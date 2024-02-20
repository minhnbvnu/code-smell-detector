function forceComma(node) {
                const last = getLastItem(node);
                const trailing = getTrailingToken(node);
                if (last && trailing && !util.isCommaToken(trailing)) {
                    context.report({
                        node,
                        messageId: 'missing',
                        fix(fixer) {
                            return fixer.insertTextAfter(last, ',');
                        },
                    });
                }
            }