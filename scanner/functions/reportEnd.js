function reportEnd(node, messageId, match) {
                context.report({
                    node,
                    fix(fixer) {
                        if (requireSpace) {
                            return fixer.insertTextAfterRange([node.range[0], node.range[1] - 2], " ");
                        }
                        const end = node.range[1] - 2, start = end - match[0].length;
                        return fixer.replaceTextRange([start, end], "");
                    },
                    messageId
                });
            }