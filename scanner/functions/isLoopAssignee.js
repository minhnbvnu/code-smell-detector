function isLoopAssignee(node) {
        return (node.parent.type === "ForOfStatement" || node.parent.type === "ForInStatement") &&
            node === node.parent.left;
    }