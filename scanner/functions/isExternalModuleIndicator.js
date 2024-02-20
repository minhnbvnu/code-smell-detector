function isExternalModuleIndicator(result) {
            return isAnyImportOrReExport(result) || isExportAssignment(result) || hasSyntacticModifier(result, 1 /* Export */);
        }