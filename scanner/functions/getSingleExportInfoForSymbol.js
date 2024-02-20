function getSingleExportInfoForSymbol(symbol, symbolName2, moduleSymbol, program, host) {
            var _a2, _b;
            const compilerOptions = program.getCompilerOptions();
            const mainProgramInfo = getInfoWithChecker(program.getTypeChecker(), 
            /*isFromPackageJson*/
            false);
            if (mainProgramInfo) {
                return mainProgramInfo;
            }
            const autoImportProvider = (_b = (_a2 = host.getPackageJsonAutoImportProvider) == null ? void 0 : _a2.call(host)) == null ? void 0 : _b.getTypeChecker();
            return Debug.checkDefined(autoImportProvider && getInfoWithChecker(autoImportProvider, 
            /*isFromPackageJson*/
            true), `Could not find symbol in specified module for code actions`);
            function getInfoWithChecker(checker, isFromPackageJson) {
                const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
                if (defaultInfo && skipAlias(defaultInfo.symbol, checker) === symbol) {
                    return { symbol: defaultInfo.symbol, moduleSymbol, moduleFileName: void 0, exportKind: defaultInfo.exportKind, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
                }
                const named = checker.tryGetMemberInModuleExportsAndProperties(symbolName2, moduleSymbol);
                if (named && skipAlias(named, checker) === symbol) {
                    return { symbol: named, moduleSymbol, moduleFileName: void 0, exportKind: 0 /* Named */, targetFlags: skipAlias(symbol, checker).flags, isFromPackageJson };
                }
            }
        }