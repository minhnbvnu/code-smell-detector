function entryToImportOrExport(entry) {
            const node = entry.node;
            if (isImportSpecifier(node.parent) || isImportClause(node.parent) || isImportEqualsDeclaration(node.parent) || isNamespaceImport(node.parent)) {
                return node;
            }
            if (isExportSpecifier(node.parent) || isExportAssignment(node.parent)) {
                return node;
            }
            return void 0;
        }