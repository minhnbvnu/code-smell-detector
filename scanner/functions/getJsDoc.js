function getJsDoc(node, sourceFile) {
        const result = [];
        for (const child of node.getChildren(sourceFile)) {
            if (!node_1.isJsDoc(child))
                break;
            result.push(child);
        }
        return result;
    }