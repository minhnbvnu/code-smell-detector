function isInsideWithBlock(node) {
        if (node.type === "Program") {
            return false;
        }
        return node.parent.type === "WithStatement" && node.parent.body === node ? true : isInsideWithBlock(node.parent);
    }