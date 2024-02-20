function getModuleExportName(node) {
        if (node.type === "Identifier") {
            return node.name;
        }
        // string literal
        return node.value;
    }