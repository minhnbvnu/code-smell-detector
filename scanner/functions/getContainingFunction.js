function getContainingFunction(node) {
            return findAncestor(node.parent, isFunctionLike);
        }