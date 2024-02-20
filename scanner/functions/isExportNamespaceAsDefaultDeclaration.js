function isExportNamespaceAsDefaultDeclaration(node) {
            return !!(isExportDeclaration(node) && node.exportClause && isNamespaceExport(node.exportClause) && node.exportClause.name.escapedText === "default");
        }