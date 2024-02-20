function checkVariableDeclaration(node) {
                const tsNode = parserServices.esTreeNodeToTSNodeMap.get(node);
                if (tsNode.initializer === undefined || node.init == null) {
                    return;
                }
                const varType = checker.getTypeAtLocation(tsNode.name);
                if (!isVoidReturningFunctionType(checker, tsNode.initializer, varType)) {
                    return;
                }
                if (returnsThenable(checker, tsNode.initializer)) {
                    context.report({
                        messageId: 'voidReturnVariable',
                        node: node.init,
                    });
                }
            }