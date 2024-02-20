function hasExportAssignmentSymbol(moduleSymbol) {
                return moduleSymbol.exports.get("export=" /* ExportEquals */) !== void 0;
            }