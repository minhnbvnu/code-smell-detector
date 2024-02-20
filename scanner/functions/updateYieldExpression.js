function updateYieldExpression(node, asteriskToken, expression) {
                return node.expression !== expression || node.asteriskToken !== asteriskToken ? update(createYieldExpression(asteriskToken, expression), node) : node;
            }