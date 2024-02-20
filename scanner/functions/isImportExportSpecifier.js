function isImportExportSpecifier(importExportType, type) {
        const arrayToCheck = type === "named" ? NAMED_TYPES : NAMESPACE_TYPES;
        return arrayToCheck.includes(importExportType);
    }