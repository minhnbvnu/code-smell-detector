function hasArraySpread(node) {
        return node.arguments.some(arg => arg.type === "SpreadElement");
    }