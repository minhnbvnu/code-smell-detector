function getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions) {
            const exported = getDefaultLikeExportWorker(moduleSymbol, checker);
            if (!exported)
                return void 0;
            const { symbol, exportKind } = exported;
            const info = getDefaultExportInfoWorker(symbol, checker, compilerOptions);
            return info && { symbol, exportKind, ...info };
        }