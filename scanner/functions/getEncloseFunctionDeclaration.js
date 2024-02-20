function getEncloseFunctionDeclaration(reference) {
        let node = reference.identifier;
        while (node) {
            if (node.type === "FunctionDeclaration") {
                return node.id ? node : null;
            }
            node = node.parent;
        }
        return null;
    }