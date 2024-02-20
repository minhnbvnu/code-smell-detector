function getChildOfKind(node, kind, sourceFile) {
        for (const child of node.getChildren(sourceFile))
            if (child.kind === kind)
                return child;
    }