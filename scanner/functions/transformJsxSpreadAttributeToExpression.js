function transformJsxSpreadAttributeToExpression(node) {
                return Debug.checkDefined(visitNode(node.expression, visitor, isExpression));
            }