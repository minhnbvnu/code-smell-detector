function convertDoStatement(node, convertedLoopBody) {
                return factory2.updateDoStatement(node, convertedLoopBody, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)));
            }