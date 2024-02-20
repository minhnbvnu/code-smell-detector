function is_require(node) {
        return typescript_1.default.isCallExpression(node) &&
            typescript_1.default.isIdentifier(node.expression) &&
            node.expression.text === "require" &&
            node.arguments.length === 1;
    }