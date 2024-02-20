function isValidPropertyAccessForCompletions(node, type, property) {
                return isPropertyAccessible(node, node.kind === 208 /* PropertyAccessExpression */ && node.expression.kind === 106 /* SuperKeyword */, 
                /* isWrite */
                false, type, property);
            }