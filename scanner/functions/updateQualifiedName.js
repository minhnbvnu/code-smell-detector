function updateQualifiedName(node, left, right) {
                return node.left !== left || node.right !== right ? update(createQualifiedName(left, right), node) : node;
            }