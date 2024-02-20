function isEmptyExport(node) {
        return (node.type === utils_1.AST_NODE_TYPES.ExportNamedDeclaration &&
            node.specifiers.length === 0 &&
            !node.declaration);
    }