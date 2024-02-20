function hasArgumentsWithAccessors(node) {
        return node.arguments
            .filter(arg => arg.type === "ObjectExpression")
            .some(hasAccessors);
    }