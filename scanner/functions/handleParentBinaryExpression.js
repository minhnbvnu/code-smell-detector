function handleParentBinaryExpression(node, parent, classScope) {
                if (parent.left === node &&
                    tsutils.isAssignmentKind(parent.operatorToken.kind)) {
                    classScope.addVariableModification(node);
                }
            }