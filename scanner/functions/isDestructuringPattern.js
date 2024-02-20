function isDestructuringPattern(node) {
        return node.type === "ObjectPattern" || node.type === "ArrayPattern";
    }