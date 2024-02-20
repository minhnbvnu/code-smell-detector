function skipOuterExpressions(node, kinds = 15 /* All */) {
            while (isOuterExpression(node, kinds)) {
                node = node.expression;
            }
            return node;
        }