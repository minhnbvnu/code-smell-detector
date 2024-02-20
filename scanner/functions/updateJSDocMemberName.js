function updateJSDocMemberName(node, left, right) {
                return node.left !== left || node.right !== right ? update(createJSDocMemberName(left, right), node) : node;
            }