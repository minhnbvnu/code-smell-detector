function isBindableStaticElementAccessExpression(node, excludeThisKeyword) {
            return isLiteralLikeElementAccess(node) && (!excludeThisKeyword && node.expression.kind === 108 /* ThisKeyword */ || isEntityNameExpression(node.expression) || isBindableStaticAccessExpression(node.expression, 
            /*excludeThisKeyword*/
            true));
        }