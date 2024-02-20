function substituteBinaryExpression(node) {
                if (isAssignmentOperator(node.operatorToken.kind) && isIdentifier(node.left) && !isGeneratedIdentifier(node.left) && !isLocalName(node.left) && !isDeclarationNameOfEnumOrNamespace(node.left)) {
                    const exportedNames = getExports(node.left);
                    if (exportedNames) {
                        let expression = node;
                        for (const exportName of exportedNames) {
                            expression = createExportExpression(exportName, preventSubstitution(expression));
                        }
                        return expression;
                    }
                }
                return node;
            }