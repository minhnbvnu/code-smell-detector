function visitElementAccessExpression(node) {
                if (containsYield(node.argumentExpression)) {
                    return factory2.updateElementAccessExpression(node, cacheExpression(Debug.checkDefined(visitNode(node.expression, visitor, isLeftHandSideExpression))), Debug.checkDefined(visitNode(node.argumentExpression, visitor, isExpression)));
                }
                return visitEachChild(node, visitor, context);
            }