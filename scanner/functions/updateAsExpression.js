function updateAsExpression(node, expression, type) {
                return node.expression !== expression || node.type !== type ? update(createAsExpression(expression, type), node) : node;
            }