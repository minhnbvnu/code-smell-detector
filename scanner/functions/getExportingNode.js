function getExportingNode(node) {
        return node.parent &&
            (node.parent.type === utils_1.AST_NODE_TYPES.ExportNamedDeclaration ||
                node.parent.type === utils_1.AST_NODE_TYPES.ExportDefaultDeclaration)
            ? node.parent
            : undefined;
    }