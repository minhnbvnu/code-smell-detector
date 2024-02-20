function getImportExportType(node) {
        if (node.specifiers && node.specifiers.length > 0) {
            const nodeSpecifiers = node.specifiers;
            const index = nodeSpecifiers.findIndex(({ type }) => isImportExportSpecifier(type, "named") ||
                isImportExportSpecifier(type, "namespace"));
            const i = index > -1 ? index : 0;
            return nodeSpecifiers[i].type;
        }
        if (node.type === "ExportAllDeclaration") {
            if (node.exported) {
                return "ExportNamespaceSpecifier";
            }
            return "ExportAll";
        }
        return "SideEffectImport";
    }