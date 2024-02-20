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