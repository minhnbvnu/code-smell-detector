function updateNonNullExpression(node, expression) {
                if (isNonNullChain(node)) {
                    return updateNonNullChain(node, expression);
                }
                return node.expression !== expression ? update(createNonNullExpression(expression), node) : node;
            }