function isStatementInAmbientContext(node) {
        while (node.flags & ts.NodeFlags.NestedNamespace)
            node = node.parent;
        return hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword) || isAmbientModuleBlock(node.parent);
    }