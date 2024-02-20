function convertForInStatement(node, convertedLoopBody) {
                return factory2.updateForInStatement(node, Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }