function traverseUnaryLogicalExpression(node) {
                traverseNode(node.argument, true);
            }