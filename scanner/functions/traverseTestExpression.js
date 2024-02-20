function traverseTestExpression(node) {
                if (node.test == null) {
                    return;
                }
                traverseNode(node.test, true);
            }