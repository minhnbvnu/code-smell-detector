function addCommonjsExport(decl) {
            return [decl, ...getNamesToExportInCommonJS(decl).map(createExportAssignment)];
        }