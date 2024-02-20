function getNewImportFixes(program, sourceFile, usagePosition, isValidTypeOnlyUseSite, useRequire, exportInfo, host, preferences, fromCacheOnly) {
            const isJs = isSourceFileJS(sourceFile);
            const compilerOptions = program.getCompilerOptions();
            const moduleSpecifierResolutionHost = createModuleSpecifierResolutionHost(program, host);
            const getChecker = createGetChecker(program, host);
            const moduleResolution = getEmitModuleResolutionKind(compilerOptions);
            const rejectNodeModulesRelativePaths = moduleResolutionUsesNodeModules(moduleResolution);
            const getModuleSpecifiers2 = fromCacheOnly ? (moduleSymbol) => ({ moduleSpecifiers: ts_moduleSpecifiers_exports.tryGetModuleSpecifiersFromCache(moduleSymbol, sourceFile, moduleSpecifierResolutionHost, preferences), computedWithoutCache: false }) : (moduleSymbol, checker) => ts_moduleSpecifiers_exports.getModuleSpecifiersWithCacheInfo(moduleSymbol, checker, compilerOptions, sourceFile, moduleSpecifierResolutionHost, preferences);
            let computedWithoutCacheCount = 0;
            const fixes = flatMap(exportInfo, (exportInfo2, i) => {
                const checker = getChecker(exportInfo2.isFromPackageJson);
                const { computedWithoutCache, moduleSpecifiers } = getModuleSpecifiers2(exportInfo2.moduleSymbol, checker);
                const importedSymbolHasValueMeaning = !!(exportInfo2.targetFlags & 111551 /* Value */);
                const addAsTypeOnly = getAddAsTypeOnly(isValidTypeOnlyUseSite, 
                /*isForNewImportDeclaration*/
                true, exportInfo2.symbol, exportInfo2.targetFlags, checker, compilerOptions);
                computedWithoutCacheCount += computedWithoutCache ? 1 : 0;
                return mapDefined(moduleSpecifiers, (moduleSpecifier) => {
                    var _a2;
                    if (rejectNodeModulesRelativePaths && pathContainsNodeModules(moduleSpecifier)) {
                        return void 0;
                    }
                    if (!importedSymbolHasValueMeaning && isJs && usagePosition !== void 0) {
                        return { kind: 1 /* JsdocTypeImport */, moduleSpecifier, usagePosition, exportInfo: exportInfo2, isReExport: i > 0 };
                    }
                    const importKind = getImportKind(sourceFile, exportInfo2.exportKind, compilerOptions);
                    let qualification;
                    if (usagePosition !== void 0 && importKind === 3 /* CommonJS */ && exportInfo2.exportKind === 0 /* Named */) {
                        const exportEquals = checker.resolveExternalModuleSymbol(exportInfo2.moduleSymbol);
                        let namespacePrefix;
                        if (exportEquals !== exportInfo2.moduleSymbol) {
                            namespacePrefix = (_a2 = getDefaultExportInfoWorker(exportEquals, checker, compilerOptions)) == null ? void 0 : _a2.name;
                        }
                        namespacePrefix || (namespacePrefix = moduleSymbolToValidIdentifier(exportInfo2.moduleSymbol, getEmitScriptTarget(compilerOptions), 
                        /*forceCapitalize*/
                        false));
                        qualification = { namespacePrefix, usagePosition };
                    }
                    return {
                        kind: 3 /* AddNew */,
                        moduleSpecifier,
                        importKind,
                        useRequire,
                        addAsTypeOnly,
                        exportInfo: exportInfo2,
                        isReExport: i > 0,
                        qualification
                    };
                });
            });
            return { computedWithoutCacheCount, fixes };
        }