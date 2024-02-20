function isBindableStaticNameExpression(node, excludeThisKeyword) {
            return isEntityNameExpression(node) || isBindableStaticAccessExpression(node, excludeThisKeyword);
        }