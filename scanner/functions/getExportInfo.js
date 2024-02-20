function getExportInfo(exportSymbol, exportKind, checker) {
            const moduleSymbol = exportSymbol.parent;
            if (!moduleSymbol)
                return void 0;
            const exportingModuleSymbol = checker.getMergedSymbol(moduleSymbol);
            return isExternalModuleSymbol(exportingModuleSymbol) ? { exportingModuleSymbol, exportKind } : void 0;
        }