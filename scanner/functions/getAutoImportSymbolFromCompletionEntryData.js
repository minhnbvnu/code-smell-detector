function getAutoImportSymbolFromCompletionEntryData(name, data, program, host) {
            const containingProgram = data.isPackageJsonImport ? host.getPackageJsonAutoImportProvider() : program;
            const checker = containingProgram.getTypeChecker();
            const moduleSymbol = data.ambientModuleName ? checker.tryFindAmbientModule(data.ambientModuleName) : data.fileName ? checker.getMergedSymbol(Debug.checkDefined(containingProgram.getSourceFile(data.fileName)).symbol) : void 0;
            if (!moduleSymbol)
                return void 0;
            let symbol = data.exportName === "export=" /* ExportEquals */ ? checker.resolveExternalModuleSymbol(moduleSymbol) : checker.tryGetMemberInModuleExportsAndProperties(data.exportName, moduleSymbol);
            if (!symbol)
                return void 0;
            const isDefaultExport = data.exportName === "default" /* Default */;
            symbol = isDefaultExport && getLocalSymbolForExportDefault(symbol) || symbol;
            return { symbol, origin: completionEntryDataToSymbolOriginInfo(data, name, moduleSymbol) };
        }