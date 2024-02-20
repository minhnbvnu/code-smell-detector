function findClosestParentOfType(node, types) {
                if (!node.parent) {
                    return null;
                }
                if (!types.includes(node.parent.type)) {
                    return findClosestParentOfType(node.parent, types);
                }
                return node.parent;
            }