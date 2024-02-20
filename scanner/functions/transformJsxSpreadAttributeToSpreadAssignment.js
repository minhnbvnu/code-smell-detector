function transformJsxSpreadAttributeToSpreadAssignment(node) {
                return factory2.createSpreadAssignment(Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
            }