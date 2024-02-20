function addSymbol(moduleSymbol, toFile, exportedSymbol, exportKind, program2, isFromPackageJson) {
                const moduleSpecifierResolutionHost = getModuleSpecifierResolutionHost(isFromPackageJson);
                if (toFile && isImportableFile(program2, fromFile, toFile, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) || !toFile && packageJsonFilter.allowsImportingAmbientModule(moduleSymbol, moduleSpecifierResolutionHost)) {
                    const checker = program2.getTypeChecker();
                    originalSymbolToExportInfos.add(getUniqueSymbolId(exportedSymbol, checker).toString(), { symbol: exportedSymbol, moduleSymbol, moduleFileName: toFile == null ? void 0 : toFile.fileName, exportKind, targetFlags: skipAlias(exportedSymbol, checker).flags, isFromPackageJson });
                }
            }