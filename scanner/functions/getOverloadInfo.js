function getOverloadInfo(node) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration:
                return 'constructor';
            case utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration:
                return '()';
            default: {
                const { key } = node;
                return isIdentifier(key) ? key.name : key.raw;
            }
        }
    }