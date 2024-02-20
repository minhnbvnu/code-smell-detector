function getContainingFunctionDeclaration(node) {
            return findAncestor(node.parent, isFunctionLikeDeclaration);
        }