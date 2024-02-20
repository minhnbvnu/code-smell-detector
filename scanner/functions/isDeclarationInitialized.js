function isDeclarationInitialized(node) {
        return node.declarations.every(declarator => declarator.init !== null);
    }