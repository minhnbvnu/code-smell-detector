function visitNewExpression(node) {
                if (forEach(node.arguments, containsYield)) {
                    const { target, thisArg } = factory2.createCallBinding(factory2.createPropertyAccessExpression(node.expression, "bind"), hoistVariableDeclaration);
                    return setOriginalNode(setTextRange(factory2.createNewExpression(factory2.createFunctionApplyCall(cacheExpression(Debug.checkDefined(visitNode(target, visitor, isExpression))), thisArg, visitElements(node.arguments, 
                    /*leadingElement*/
                    factory2.createVoidZero())), 
                    /*typeArguments*/
                    void 0, []), node), node);
                }
                return visitEachChild(node, visitor, context);
            }