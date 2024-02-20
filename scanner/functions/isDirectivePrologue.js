function isDirectivePrologue(node, sourceCode) {
        if (isDirective(node, sourceCode) &&
            node.parent &&
            'body' in node.parent &&
            Array.isArray(node.parent.body)) {
            for (const sibling of node.parent.body) {
                if (sibling === node) {
                    break;
                }
                if (!isDirective(sibling, sourceCode)) {
                    return false;
                }
            }
            return true;
        }
        return false;
    }