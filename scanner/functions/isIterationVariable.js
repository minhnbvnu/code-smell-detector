function isIterationVariable(node) {
        const { parent } = node;
        return ((parent.type === "ForInStatement" &&
            parent.left === node) ||
            (parent.type === "ForOfStatement" &&
                parent.left === node));
    }