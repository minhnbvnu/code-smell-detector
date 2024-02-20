function createJSDocMemberName(left, right) {
                const node = createBaseNode(314 /* JSDocMemberName */);
                node.left = left;
                node.right = right;
                node.transformFlags |= propagateChildFlags(node.left) | propagateChildFlags(node.right);
                return node;
            }