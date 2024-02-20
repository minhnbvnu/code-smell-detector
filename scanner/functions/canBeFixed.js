function canBeFixed(node) {
        return (node.type === "Identifier" ||
            (node.type === "MemberExpression" &&
                (node.object.type === "Identifier" || node.object.type === "ThisExpression") &&
                (!node.computed || node.property.type === "Literal")));
    }