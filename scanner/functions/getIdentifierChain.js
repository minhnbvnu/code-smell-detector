function getIdentifierChain(node) {
                if (isIdentifier(node)) {
                    return [node];
                }
                else {
                    return append(getIdentifierChain(node.left), node.right);
                }
            }