function addExport(decl, useEs6Exports) {
            return useEs6Exports ? [addEs6Export(decl)] : addCommonjsExport(decl);
        }