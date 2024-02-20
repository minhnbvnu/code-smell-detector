function getEntityNameParent(name) {
        let parent = name.parent;
        while (parent.kind === ts.SyntaxKind.QualifiedName)
            parent = parent.parent;
        return parent;
    }