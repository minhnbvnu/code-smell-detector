function visitCallExpression(node) {
                if (!isImportCall(node) && forEach(node.arguments, containsYield)) {
                    const { target, thisArg } = factory2.createCallBinding(node.expression, hoistVariableDeclaration, languageVersion, 
                    /*cacheIdentifiers*/
                    true);
                    return setOriginalNode(setTextRange(factory2.createFunctionApplyCall(cacheExpression(Debug.checkDefined(visitNode(target, visitor, isLeftHandSideExpression))), thisArg, visitElements(node.arguments)), node), node);
                }
                return visitEachChild(node, visitor, context);
            }