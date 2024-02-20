function checkPropertyAccessChain(node, checkMode) {
                const leftType = checkExpression(node.expression);
                const nonOptionalType = getOptionalExpressionType(leftType, node.expression);
                return propagateOptionalTypeMarker(checkPropertyAccessExpressionOrQualifiedName(node, node.expression, checkNonNullType(nonOptionalType, node.expression), node.name, checkMode), node, nonOptionalType !== leftType);
            }