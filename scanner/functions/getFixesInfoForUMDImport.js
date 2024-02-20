function getFixesInfoForUMDImport({ sourceFile, program, host, preferences }, token) {
            const checker = program.getTypeChecker();
            const umdSymbol = getUmdSymbol(token, checker);
            if (!umdSymbol)
                return void 0;
            const symbol = checker.getAliasedSymbol(umdSymbol);
            const symbolName2 = umdSymbol.name;
            const exportInfo = [{ symbol: umdSymbol, moduleSymbol: symbol, moduleFileName: void 0, exportKind: 3 /* UMD */, targetFlags: symbol.flags, isFromPackageJson: false }];
            const useRequire = shouldUseRequire(sourceFile, program);
            const fixes = getImportFixes(exportInfo, 
            /*usagePosition*/
            void 0, 
            /*isValidTypeOnlyUseSite*/
            false, useRequire, program, sourceFile, host, preferences).fixes;
            return fixes.map((fix) => {
                var _a2;
                return { fix, symbolName: symbolName2, errorIdentifierText: (_a2 = tryCast(token, isIdentifier)) == null ? void 0 : _a2.text };
            });
        }