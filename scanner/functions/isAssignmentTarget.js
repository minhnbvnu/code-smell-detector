function isAssignmentTarget(node) {
        const parent = node.parent;
        return (
        // normal assignment
        (parent.type === "AssignmentExpression" &&
            parent.left === node) ||
            // destructuring
            parent.type === "ArrayPattern" ||
            parent.type === "RestElement" ||
            (parent.type === "Property" &&
                parent.value === node &&
                parent.parent.type === "ObjectPattern") ||
            (parent.type === "AssignmentPattern" &&
                parent.left === node));
    }