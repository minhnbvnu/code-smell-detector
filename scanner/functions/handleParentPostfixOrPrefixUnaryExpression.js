function handleParentPostfixOrPrefixUnaryExpression(node, classScope) {
                if (node.operator === ts.SyntaxKind.PlusPlusToken ||
                    node.operator === ts.SyntaxKind.MinusMinusToken) {
                    classScope.addVariableModification(node.operand);
                }
            }