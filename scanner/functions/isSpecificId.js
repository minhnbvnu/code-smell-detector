function isSpecificId(node, name) {
        return node.type === "Identifier" && checkText(node.name, name);
    }