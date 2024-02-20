function getExportInfos(symbolName2, isJsxTagName, currentTokenMeaning, cancellationToken, fromFile, program, useAutoImportProvider, host, preferences) {
            var _a2;
            const originalSymbolToExportInfos = createMultiMap();
            const packageJsonFilter = createPackageJsonImportFilter(fromFile, preferences, host);
            const moduleSpecifierCache = (_a2 = host.getModuleSpecifierCache) == null ? void 0 : _a2.call(host);
            const getModuleSpecifierResolutionHost = memoizeOne((isFromPackageJson) => {
                return createModuleSpecifierResolutionHost(isFromPackageJson ? host.getPackageJsonAutoImportProvider() : program, host);
            });
            function addSymbol(moduleSymbol, toFile, exportedSymbol, exportKind, program2, isFromPackageJson) {
                const moduleSpecifierResolutionHost = getModuleSpecifierResolutionHost(isFromPackageJson);
                if (toFile && isImportableFile(program2, fromFile, toFile, preferences, packageJsonFilter, moduleSpecifierResolutionHost, moduleSpecifierCache) || !toFile && packageJsonFilter.allowsImportingAmbientModule(moduleSymbol, moduleSpecifierResolutionHost)) {
                    const checker = program2.getTypeChecker();
                    originalSymbolToExportInfos.add(getUniqueSymbolId(exportedSymbol, checker).toString(), { symbol: exportedSymbol, moduleSymbol, moduleFileName: toFile == null ? void 0 : toFile.fileName, exportKind, targetFlags: skipAlias(exportedSymbol, checker).flags, isFromPackageJson });
                }
            }
            forEachExternalModuleToImportFrom(program, host, preferences, useAutoImportProvider, (moduleSymbol, sourceFile, program2, isFromPackageJson) => {
                const checker = program2.getTypeChecker();
                cancellationToken.throwIfCancellationRequested();
                const compilerOptions = program2.getCompilerOptions();
                const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
                if (defaultInfo && (defaultInfo.name === symbolName2 || moduleSymbolToValidIdentifier(moduleSymbol, getEmitScriptTarget(compilerOptions), isJsxTagName) === symbolName2) && symbolHasMeaning(defaultInfo.resolvedSymbol, currentTokenMeaning)) {
                    addSymbol(moduleSymbol, sourceFile, defaultInfo.symbol, defaultInfo.exportKind, program2, isFromPackageJson);
                }
                const exportSymbolWithIdenticalName = checker.tryGetMemberInModuleExportsAndProperties(symbolName2, moduleSymbol);
                if (exportSymbolWithIdenticalName && symbolHasMeaning(exportSymbolWithIdenticalName, currentTokenMeaning)) {
                    addSymbol(moduleSymbol, sourceFile, exportSymbolWithIdenticalName, 0 /* Named */, program2, isFromPackageJson);
                }
            });
            return originalSymbolToExportInfos;
        }