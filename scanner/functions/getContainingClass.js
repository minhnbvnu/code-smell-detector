function getContainingClass(node) {
            return findAncestor(node.parent, isClassLike);
        }