function WebPartManager_ExportWebPart(exportUrl, warn, confirmOnly) {
    if (warn == true && __wpmExportWarning.length > 0 && this.personalizationScopeShared != true) {
        if (confirm(__wpmExportWarning) == false) {
            return false;
        }
    }
    if (confirmOnly == false) {
        window.location = exportUrl;
    }
    return true;
}