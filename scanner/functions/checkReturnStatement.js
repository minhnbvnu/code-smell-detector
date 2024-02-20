function checkReturnStatement(node) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (tsNode.expression === undefined || node.argument == null) {
                    return;
                }
                const contextualType = checker.getContextualType(tsNode.expression);
                if (contextualType !== undefined &&
                    isVoidReturningFunctionType(checker, tsNode.expression, contextualType) &&
                    returnsThenable(checker, tsNode.expression)) {
                    context.report({
                        messageId: 'voidReturnReturnValue',
                        node: node.argument,
                    });
                }
            }