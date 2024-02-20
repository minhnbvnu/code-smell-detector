function checkDefaultVoid(node, parentNode) {
                if (parentNode.default !== node) {
                    context.report({
                        messageId: getNotReturnOrGenericMessageId(node),
                        node,
                    });
                }
            }