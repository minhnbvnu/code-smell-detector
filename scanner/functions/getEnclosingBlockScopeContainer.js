function getEnclosingBlockScopeContainer(node) {
            return findAncestor(node.parent, (current) => isBlockScope(current, current.parent));
        }