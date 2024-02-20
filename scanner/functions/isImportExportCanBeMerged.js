function isImportExportCanBeMerged(node1, node2) {
        const importExportType1 = getImportExportType(node1);
        const importExportType2 = getImportExportType(node2);
        if ((importExportType1 === "ExportAll" &&
            importExportType2 !== "ExportAll" &&
            importExportType2 !== "SideEffectImport") ||
            (importExportType1 !== "ExportAll" &&
                importExportType1 !== "SideEffectImport" &&
                importExportType2 === "ExportAll")) {
            return false;
        }
        if ((isImportExportSpecifier(importExportType1, "namespace") &&
            isImportExportSpecifier(importExportType2, "named")) ||
            (isImportExportSpecifier(importExportType2, "namespace") &&
                isImportExportSpecifier(importExportType1, "named"))) {
            return false;
        }
        return true;
    }