function isAssignmentLeft(node) {
        const { parent } = node;
        return ((parent.type === "AssignmentExpression" &&
            parent.left === node) ||
            // Destructuring assignments
            parent.type === "ArrayPattern" ||
            (parent.type === "Property" &&
                parent.value === node &&
                parent.parent.type === "ObjectPattern") ||
            parent.type === "RestElement" ||
            (parent.type === "AssignmentPattern" &&
                parent.left === node));
    }