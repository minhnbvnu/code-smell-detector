function visitLeftAssociativeBinaryExpression(node) {
                if (containsYield(node.right)) {
                    if (isLogicalOperator(node.operatorToken.kind)) {
                        return visitLogicalBinaryExpression(node);
                    }
                    else if (node.operatorToken.kind === 27 /* CommaToken */) {
                        return visitCommaExpression(node);
                    }
                    return factory2.updateBinaryExpression(node, cacheExpression(Debug.checkDefined(visitNode(node.left, visitor, isExpression))), node.operatorToken, Debug.checkDefined(visitNode(node.right, visitor, isExpression)));
                }
                return visitEachChild(node, visitor, context);
            }