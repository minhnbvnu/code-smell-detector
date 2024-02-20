function isAmbientModuleBlock(node) {
        while (node.kind === ts.SyntaxKind.ModuleBlock) {
            do
                node = node.parent;
            while (node.flags & ts.NodeFlags.NestedNamespace);
            if (hasModifier(node.modifiers, ts.SyntaxKind.DeclareKeyword))
                return true;
            node = node.parent;
        }
        return false;
    }