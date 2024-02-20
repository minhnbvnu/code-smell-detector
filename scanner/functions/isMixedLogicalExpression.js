function isMixedLogicalExpression(node) {
        const seen = new Set();
        const queue = [node.parent, node.left, node.right];
        for (const current of queue) {
            if (seen.has(current)) {
                continue;
            }
            seen.add(current);
            if (current && current.type === utils_1.AST_NODE_TYPES.LogicalExpression) {
                if (current.operator === '&&') {
                    return true;
                }
                else if (current.operator === '||') {
                    // check the pieces of the node to catch cases like `a || b || c && d`
                    queue.push(current.parent, current.left, current.right);
                }
            }
        }
        return false;
    }