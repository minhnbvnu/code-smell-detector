function isAccessorProperty(node) {
        return node.type === "Property" &&
            (node.kind === "get" || node.kind === "set");
    }