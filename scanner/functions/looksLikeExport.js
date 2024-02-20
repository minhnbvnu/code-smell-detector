function looksLikeExport(astNode) {
        return astNode.type === "ExportDefaultDeclaration" || astNode.type === "ExportNamedDeclaration" ||
            astNode.type === "ExportAllDeclaration" || astNode.type === "ExportSpecifier";
    }