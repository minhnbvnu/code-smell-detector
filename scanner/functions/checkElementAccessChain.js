function checkElementAccessChain(node, checkMode) {
                const exprType = checkExpression(node.expression);
                const nonOptionalType = getOptionalExpressionType(exprType, node.expression);
                return propagateOptionalTypeMarker(checkElementAccessExpression(node, checkNonNullType(nonOptionalType, node.expression), checkMode), node, nonOptionalType !== exprType);
            }