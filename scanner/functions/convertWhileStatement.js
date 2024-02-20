function convertWhileStatement(node, convertedLoopBody) {
                return factory2.updateWhileStatement(node, Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }