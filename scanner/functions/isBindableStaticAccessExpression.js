function isBindableStaticAccessExpression(node, excludeThisKeyword) {
            return isPropertyAccessExpression(node) && (!excludeThisKeyword && node.expression.kind === 108 /* ThisKeyword */ || isIdentifier(node.name) && isBindableStaticNameExpression(node.expression, 
            /*excludeThisKeyword*/
            true)) || isBindableStaticElementAccessExpression(node, excludeThisKeyword);
        }