function checkJSXAttribute(node) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                const value = tsNode.initializer;
                if (node.value == null ||
                    value === undefined ||
                    !ts.isJsxExpression(value) ||
                    value.expression === undefined) {
                    return;
                }
                const contextualType = checker.getContextualType(value);
                if (contextualType !== undefined &&
                    isVoidReturningFunctionType(checker, value, contextualType) &&
                    returnsThenable(checker, value.expression)) {
                    context.report({
                        messageId: 'voidReturnAttribute',
                        node: node.value,
                    });
                }
            }