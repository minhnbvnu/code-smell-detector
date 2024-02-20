function isParseIntMethod(node) {
        return (node.type === "MemberExpression" &&
            !node.computed &&
            node.property.type === "Identifier" &&
            node.property.name === "parseInt");
    }