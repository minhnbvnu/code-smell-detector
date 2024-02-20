function isModuleDeclaration(node) {
        return node.kind === ts.SyntaxKind.ModuleDeclaration;
    }