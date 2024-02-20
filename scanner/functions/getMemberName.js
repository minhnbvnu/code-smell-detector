function getMemberName(node, sourceCode) {
        switch (node.type) {
            case utils_1.AST_NODE_TYPES.TSPropertySignature:
            case utils_1.AST_NODE_TYPES.TSMethodSignature:
            case utils_1.AST_NODE_TYPES.TSAbstractPropertyDefinition:
            case utils_1.AST_NODE_TYPES.PropertyDefinition:
                return getMemberRawName(node, sourceCode);
            case utils_1.AST_NODE_TYPES.TSAbstractMethodDefinition:
            case utils_1.AST_NODE_TYPES.MethodDefinition:
                return node.kind === 'constructor'
                    ? 'constructor'
                    : getMemberRawName(node, sourceCode);
            case utils_1.AST_NODE_TYPES.TSConstructSignatureDeclaration:
                return 'new';
            case utils_1.AST_NODE_TYPES.TSCallSignatureDeclaration:
                return 'call';
            case utils_1.AST_NODE_TYPES.TSIndexSignature:
                return util.getNameFromIndexSignature(node);
            case utils_1.AST_NODE_TYPES.StaticBlock:
                return 'static block';
            default:
                return null;
        }
    }