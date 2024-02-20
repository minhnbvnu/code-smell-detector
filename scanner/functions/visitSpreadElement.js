function visitSpreadElement(node) {
                return visitNode(node.expression, visitor, isExpression);
            }