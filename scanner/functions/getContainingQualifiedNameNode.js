function getContainingQualifiedNameNode(node) {
                while (isQualifiedName(node.parent)) {
                    node = node.parent;
                }
                return node;
            }