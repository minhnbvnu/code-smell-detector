function checkQualifiedName(node, checkMode) {
                const leftType = isPartOfTypeQuery(node) && isThisIdentifier(node.left) ? checkNonNullType(checkThisExpression(node.left), node.left) : checkNonNullExpression(node.left);
                return checkPropertyAccessExpressionOrQualifiedName(node, node.left, leftType, node.right, checkMode);
            }