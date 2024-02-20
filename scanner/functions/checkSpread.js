function checkSpread(node) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (isSometimesThenable(checker, tsNode.expression)) {
                    context.report({
                        messageId: 'spread',
                        node: node.argument,
                    });
                }
            }