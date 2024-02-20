function reportIncorrectAssertionType(node) {
                const messageId = options.assertionStyle;
                // If this node is `as const`, then don't report an error.
                if (isConst(node.typeAnnotation) && messageId === 'never') {
                    return;
                }
                context.report({
                    node,
                    messageId,
                    data: messageId !== 'never'
                        ? { cast: sourceCode.getText(node.typeAnnotation) }
                        : {},
                });
            }