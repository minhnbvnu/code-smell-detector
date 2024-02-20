function isESTreeClassMember(node) {
        return node.kind !== SyntaxKind.SemicolonClassElement;
    }