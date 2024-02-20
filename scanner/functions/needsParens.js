function needsParens(node, sourceCode) {
        const parent = node.parent;
        switch (parent.type) {
            case "VariableDeclarator":
            case "ArrayExpression":
            case "ReturnStatement":
            case "CallExpression":
            case "Property":
                return false;
            case "AssignmentExpression":
                return parent.left === node && !isParenthesised(sourceCode, node);
            default:
                return !isParenthesised(sourceCode, node);
        }
    }