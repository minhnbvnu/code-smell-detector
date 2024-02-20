function isAccessorKind(node) {
        return node.kind === "get" || node.kind === "set";
    }