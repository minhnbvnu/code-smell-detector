function getCommonJSPropertyAccess(node) {
                if (isVariableDeclaration(node) && node.initializer && isPropertyAccessExpression(node.initializer)) {
                    return node.initializer;
                }
            }