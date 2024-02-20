function isSimple(node) {
        return node.type === "Identifier" || node.type === "RestElement";
    }