function handlePropertyAccessExpression(node, parent, classScope) {
                if (ts.isBinaryExpression(parent)) {
                    handleParentBinaryExpression(node, parent, classScope);
                    return;
                }
                if (ts.isDeleteExpression(parent) || isDestructuringAssignment(node)) {
                    classScope.addVariableModification(node);
                    return;
                }
                if (ts.isPostfixUnaryExpression(parent) ||
                    ts.isPrefixUnaryExpression(parent)) {
                    handleParentPostfixOrPrefixUnaryExpression(parent, classScope);
                }
            }