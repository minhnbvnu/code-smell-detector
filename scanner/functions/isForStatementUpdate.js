function isForStatementUpdate(node) {
        const parent = node.parent;
        return parent.type === "ForStatement" && parent.update === node;
    }