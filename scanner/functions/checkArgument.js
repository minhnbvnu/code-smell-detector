function checkArgument(node) {
                if (node.arguments.length === 0) {
                    context.report({
                        node,
                        messageId: "expected"
                    });
                }
            }