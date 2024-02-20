function visitDeleteExpression(node) {
                return isOptionalChain(skipParentheses(node.expression)) ? setOriginalNode(visitNonOptionalExpression(node.expression, 
                /*captureThisArg*/
                false, 
                /*isDelete*/
                true), node) : factory2.updateDeleteExpression(node, visitNode(node.expression, visitor, isExpression));
            }