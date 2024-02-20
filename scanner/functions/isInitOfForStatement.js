function isInitOfForStatement(node) {
        return node.parent.type === "ForStatement" && node.parent.init === node;
    }