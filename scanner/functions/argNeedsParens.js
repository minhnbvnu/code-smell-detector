function argNeedsParens(node, sourceCode) {
        switch (node.type) {
            case "AssignmentExpression":
            case "ArrowFunctionExpression":
            case "ConditionalExpression":
                return !isParenthesised(sourceCode, node);
            default:
                return false;
        }
    }