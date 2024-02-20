function convertForOfStatement(node, convertedLoopBody) {
                return factory2.updateForOfStatement(node, 
                /*awaitModifier*/
                void 0, Debug.checkDefined(visitNode(node.initializer, visitor, isForInitializer)), Debug.checkDefined(visitNode(node.expression, visitor, isExpression)), convertedLoopBody);
            }