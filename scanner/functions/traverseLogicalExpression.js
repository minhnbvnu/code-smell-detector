function traverseLogicalExpression(node, isCondition = false) {
                // left argument is always treated as a condition
                traverseNode(node.left, true);
                // if the logical expression is used for control flow,
                // then it's right argument is used for it's side effects only
                traverseNode(node.right, isCondition);
            }