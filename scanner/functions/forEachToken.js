function forEachToken(node, cb, sourceFile = node.getSourceFile()) {
        const queue = [];
        while (true) {
            if (isTokenKind(node.kind)) {
                cb(node);
            }
            else if (node.kind !== ts.SyntaxKind.JSDocComment) {
                const children = node.getChildren(sourceFile);
                if (children.length === 1) {
                    node = children[0];
                    continue;
                }
                for (let i = children.length - 1; i >= 0; --i)
                    queue.push(children[i]); // add children in reverse order, when we pop the next element from the queue, it's the first child
            }
            if (queue.length === 0)
                break;
            node = queue.pop();
        }
    }