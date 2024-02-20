function isFunctionLikeDeclaration(node) {
            return node && isFunctionLikeDeclarationKind(node.kind);
        }