function visitAwaitExpression(node) {
                if (enclosingFunctionFlags & 2 /* Async */ && enclosingFunctionFlags & 1 /* Generator */) {
                    return setOriginalNode(setTextRange(factory2.createYieldExpression(
                    /*asteriskToken*/
                    void 0, emitHelpers().createAwaitHelper(visitNode(node.expression, visitor, isExpression))), 
                    /*location*/
                    node), node);
                }
                return visitEachChild(node, visitor, context);
            }