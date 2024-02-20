function visitExpressionWithTypeArguments(node) {
                return factory2.updateExpressionWithTypeArguments(node, Debug.checkDefined(visitNode(node.expression, visitor, isLeftHandSideExpression)), 
                /*typeArguments*/
                void 0);
            }