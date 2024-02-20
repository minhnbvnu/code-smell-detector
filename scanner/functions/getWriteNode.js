function getWriteNode(id) {
        let node = id.parent;
        while (node &&
            node.type !== "AssignmentExpression" &&
            node.type !== "UpdateExpression" &&
            node.type !== "UnaryExpression" &&
            node.type !== "CallExpression" &&
            node.type !== "ForInStatement" &&
            node.type !== "ForOfStatement") {
            node = node.parent;
        }
        return node || id;
    }