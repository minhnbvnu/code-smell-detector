function updateSyntheticReferenceExpression(node, expression, thisArg) {
                return node.expression !== expression || node.thisArg !== thisArg ? update(createSyntheticReferenceExpression(expression, thisArg), node) : node;
            }