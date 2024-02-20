function checkPropertyAccessExpression(node, checkMode) {
                return node.flags & 32 /* OptionalChain */ ? checkPropertyAccessChain(node, checkMode) : checkPropertyAccessExpressionOrQualifiedName(node, node.expression, checkNonNullExpression(node.expression), node.name, checkMode);
            }