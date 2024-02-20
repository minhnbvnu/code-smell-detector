function isGlobalDeclaration(node) {
        return util_1.isNodeFlagSet(node.parent, ts.NodeFlags.GlobalAugmentation) || node_1.isSourceFile(node.parent) && !ts.isExternalModule(node.parent);
    }