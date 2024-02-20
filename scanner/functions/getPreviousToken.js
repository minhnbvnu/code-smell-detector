function getPreviousToken(node, sourceFile) {
        const { pos } = node;
        if (pos === 0)
            return;
        do
            node = node.parent;
        while (node.pos === pos);
        return getTokenAtPositionWorker(node, pos - 1, sourceFile !== null && sourceFile !== void 0 ? sourceFile : node.getSourceFile(), false);
    }