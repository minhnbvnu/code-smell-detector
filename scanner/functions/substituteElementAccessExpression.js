function substituteElementAccessExpression(node) {
                if (node.expression.kind === 106 /* SuperKeyword */) {
                    return createSuperElementAccessInAsyncMethod(node.argumentExpression, node);
                }
                return node;
            }