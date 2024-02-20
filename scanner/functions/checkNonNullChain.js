function checkNonNullChain(node) {
                const leftType = checkExpression(node.expression);
                const nonOptionalType = getOptionalExpressionType(leftType, node.expression);
                return propagateOptionalTypeMarker(getNonNullableType(nonOptionalType), node, nonOptionalType !== leftType);
            }