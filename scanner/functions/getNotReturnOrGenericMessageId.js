function getNotReturnOrGenericMessageId(node) {
        return node.parent.type === utils_1.AST_NODE_TYPES.TSUnionType
            ? 'invalidVoidUnionConstituent'
            : 'invalidVoidNotReturnOrGeneric';
    }