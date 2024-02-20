function createExpressionWithTypeArguments(expression, typeArguments) {
                const node = createBaseNode(230 /* ExpressionWithTypeArguments */);
                node.expression = parenthesizerRules().parenthesizeLeftSideOfAccess(expression, 
                /*optionalChain*/
                false);
                node.typeArguments = typeArguments && parenthesizerRules().parenthesizeTypeArguments(typeArguments);
                node.transformFlags |= propagateChildFlags(node.expression) | propagateChildrenFlags(node.typeArguments) | 1024 /* ContainsES2015 */;
                return node;
            }