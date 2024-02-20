function getDefaultLikeExportWorker(moduleSymbol, checker) {
            const exportEquals = checker.resolveExternalModuleSymbol(moduleSymbol);
            if (exportEquals !== moduleSymbol)
                return { symbol: exportEquals, exportKind: 2 /* ExportEquals */ };
            const defaultExport = checker.tryGetMemberInModuleExports("default" /* Default */, moduleSymbol);
            if (defaultExport)
                return { symbol: defaultExport, exportKind: 1 /* Default */ };
        }