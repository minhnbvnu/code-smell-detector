function getDefaultExportInfoWorker(defaultExport, checker, compilerOptions) {
            const localSymbol = getLocalSymbolForExportDefault(defaultExport);
            if (localSymbol)
                return { resolvedSymbol: localSymbol, name: localSymbol.name };
            const name = getNameForExportDefault(defaultExport);
            if (name !== void 0)
                return { resolvedSymbol: defaultExport, name };
            if (defaultExport.flags & 2097152 /* Alias */) {
                const aliased = checker.getImmediateAliasedSymbol(defaultExport);
                if (aliased && aliased.parent) {
                    return getDefaultExportInfoWorker(aliased, checker, compilerOptions);
                }
            }
            if (defaultExport.escapedName !== "default" /* Default */ && defaultExport.escapedName !== "export=" /* ExportEquals */) {
                return { resolvedSymbol: defaultExport, name: defaultExport.getName() };
            }
            return { resolvedSymbol: defaultExport, name: getNameForExportedSymbol(defaultExport, compilerOptions.target) };
        }