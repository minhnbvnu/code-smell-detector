function getAstNodeAtPosition(node, pos) {
        if (node.pos > pos || node.end <= pos)
            return;
        while (isNodeKind(node.kind)) {
            const nested = ts.forEachChild(node, (child) => child.pos <= pos && child.end > pos ? child : undefined);
            if (nested === undefined)
                break;
            node = nested;
        }
        return node;
    }