function isShorthandPropertyDefinition(node) {
        const parent = node.parent;
        return (parent.type === "Property" &&
            parent.parent.type === "ObjectExpression" &&
            parent.shorthand);
    }