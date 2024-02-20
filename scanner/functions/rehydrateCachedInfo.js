function rehydrateCachedInfo(info) {
                if (info.symbol && info.moduleSymbol)
                    return info;
                const { id, exportKind, targetFlags, isFromPackageJson, moduleFileName } = info;
                const [cachedSymbol, cachedModuleSymbol] = symbols.get(id) || emptyArray;
                if (cachedSymbol && cachedModuleSymbol) {
                    return {
                        symbol: cachedSymbol,
                        moduleSymbol: cachedModuleSymbol,
                        moduleFileName,
                        exportKind,
                        targetFlags,
                        isFromPackageJson
                    };
                }
                const checker = (isFromPackageJson ? host.getPackageJsonAutoImportProvider() : host.getCurrentProgram()).getTypeChecker();
                const moduleSymbol = info.moduleSymbol || cachedModuleSymbol || Debug.checkDefined(info.moduleFile ? checker.getMergedSymbol(info.moduleFile.symbol) : checker.tryFindAmbientModule(info.moduleName));
                const symbol = info.symbol || cachedSymbol || Debug.checkDefined(exportKind === 2 /* ExportEquals */ ? checker.resolveExternalModuleSymbol(moduleSymbol) : checker.tryGetMemberInModuleExportsAndProperties(unescapeLeadingUnderscores(info.symbolTableKey), moduleSymbol), `Could not find symbol '${info.symbolName}' by key '${info.symbolTableKey}' in module ${moduleSymbol.name}`);
                symbols.set(id, [symbol, moduleSymbol]);
                return {
                    symbol,
                    moduleSymbol,
                    moduleFileName,
                    exportKind,
                    targetFlags,
                    isFromPackageJson
                };
            }