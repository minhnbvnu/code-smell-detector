function isSyntheticParenthesizedExpression(node) {
            return isParenthesizedExpression(node) && nodeIsSynthesized(node) && !node.emitNode;
        }