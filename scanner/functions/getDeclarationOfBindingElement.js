function getDeclarationOfBindingElement(node) {
        let parent = node.parent.parent;
        while (parent.kind === ts.SyntaxKind.BindingElement)
            parent = parent.parent.parent;
        return parent;
    }