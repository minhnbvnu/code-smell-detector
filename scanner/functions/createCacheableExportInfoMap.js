function createCacheableExportInfoMap(host) {
            let exportInfoId = 1;
            const exportInfo = createMultiMap();
            const symbols = /* @__PURE__ */ new Map();
            const packages = /* @__PURE__ */ new Map();
            let usableByFileName;
            const cache = {
                isUsableByFile: (importingFile) => importingFile === usableByFileName,
                isEmpty: () => !exportInfo.size,
                clear: () => {
                    exportInfo.clear();
                    symbols.clear();
                    usableByFileName = void 0;
                },
                add: (importingFile, symbol, symbolTableKey, moduleSymbol, moduleFile, exportKind, isFromPackageJson, checker) => {
                    if (importingFile !== usableByFileName) {
                        cache.clear();
                        usableByFileName = importingFile;
                    }
                    let packageName;
                    if (moduleFile) {
                        const nodeModulesPathParts = getNodeModulePathParts(moduleFile.fileName);
                        if (nodeModulesPathParts) {
                            const { topLevelNodeModulesIndex, topLevelPackageNameIndex, packageRootIndex } = nodeModulesPathParts;
                            packageName = unmangleScopedPackageName(getPackageNameFromTypesPackageName(moduleFile.fileName.substring(topLevelPackageNameIndex + 1, packageRootIndex)));
                            if (startsWith(importingFile, moduleFile.path.substring(0, topLevelNodeModulesIndex))) {
                                const prevDeepestNodeModulesPath = packages.get(packageName);
                                const nodeModulesPath = moduleFile.fileName.substring(0, topLevelPackageNameIndex + 1);
                                if (prevDeepestNodeModulesPath) {
                                    const prevDeepestNodeModulesIndex = prevDeepestNodeModulesPath.indexOf(nodeModulesPathPart);
                                    if (topLevelNodeModulesIndex > prevDeepestNodeModulesIndex) {
                                        packages.set(packageName, nodeModulesPath);
                                    }
                                }
                                else {
                                    packages.set(packageName, nodeModulesPath);
                                }
                            }
                        }
                    }
                    const isDefault = exportKind === 1 /* Default */;
                    const namedSymbol = isDefault && getLocalSymbolForExportDefault(symbol) || symbol;
                    const names = exportKind === 0 /* Named */ || isExternalModuleSymbol(namedSymbol) ? unescapeLeadingUnderscores(symbolTableKey) : getNamesForExportedSymbol(namedSymbol, 
                    /*scriptTarget*/
                    void 0);
                    const symbolName2 = typeof names === "string" ? names : names[0];
                    const capitalizedSymbolName = typeof names === "string" ? void 0 : names[1];
                    const moduleName = stripQuotes(moduleSymbol.name);
                    const id = exportInfoId++;
                    const target = skipAlias(symbol, checker);
                    const storedSymbol = symbol.flags & 33554432 /* Transient */ ? void 0 : symbol;
                    const storedModuleSymbol = moduleSymbol.flags & 33554432 /* Transient */ ? void 0 : moduleSymbol;
                    if (!storedSymbol || !storedModuleSymbol)
                        symbols.set(id, [symbol, moduleSymbol]);
                    exportInfo.add(key(symbolName2, symbol, isExternalModuleNameRelative(moduleName) ? void 0 : moduleName, checker), {
                        id,
                        symbolTableKey,
                        symbolName: symbolName2,
                        capitalizedSymbolName,
                        moduleName,
                        moduleFile,
                        moduleFileName: moduleFile == null ? void 0 : moduleFile.fileName,
                        packageName,
                        exportKind,
                        targetFlags: target.flags,
                        isFromPackageJson,
                        symbol: storedSymbol,
                        moduleSymbol: storedModuleSymbol
                    });
                },
                get: (importingFile, key2) => {
                    if (importingFile !== usableByFileName)
                        return;
                    const result = exportInfo.get(key2);
                    return result == null ? void 0 : result.map(rehydrateCachedInfo);
                },
                search: (importingFile, preferCapitalized, matches, action) => {
                    if (importingFile !== usableByFileName)
                        return;
                    return forEachEntry(exportInfo, (info, key2) => {
                        const { symbolName: symbolName2, ambientModuleName } = parseKey(key2);
                        const name = preferCapitalized && info[0].capitalizedSymbolName || symbolName2;
                        if (matches(name, info[0].targetFlags)) {
                            const rehydrated = info.map(rehydrateCachedInfo);
                            const filtered = rehydrated.filter((r, i) => isNotShadowedByDeeperNodeModulesPackage(r, info[i].packageName));
                            if (filtered.length) {
                                const res = action(filtered, name, !!ambientModuleName, key2);
                                if (res !== void 0)
                                    return res;
                            }
                        }
                    });
                },
                releaseSymbols: () => {
                    symbols.clear();
                },
                onFileChanged: (oldSourceFile, newSourceFile, typeAcquisitionEnabled) => {
                    if (fileIsGlobalOnly(oldSourceFile) && fileIsGlobalOnly(newSourceFile)) {
                        return false;
                    }
                    if (usableByFileName && usableByFileName !== newSourceFile.path || // If ATA is enabled, auto-imports uses existing imports to guess whether you want auto-imports from node.
                        // Adding or removing imports from node could change the outcome of that guess, so could change the suggestions list.
                        typeAcquisitionEnabled && consumesNodeCoreModules(oldSourceFile) !== consumesNodeCoreModules(newSourceFile) || // Module agumentation and ambient module changes can add or remove exports available to be auto-imported.
                        // Changes elsewhere in the file can change the *type* of an export in a module augmentation,
                        // but type info is gathered in getCompletionEntryDetails, which doesn’t use the cache.
                        !arrayIsEqualTo(oldSourceFile.moduleAugmentations, newSourceFile.moduleAugmentations) || !ambientModuleDeclarationsAreEqual(oldSourceFile, newSourceFile)) {
                        cache.clear();
                        return true;
                    }
                    usableByFileName = newSourceFile.path;
                    return false;
                }
            };
            if (Debug.isDebugging) {
                Object.defineProperty(cache, "__cache", { get: () => exportInfo });
            }
            return cache;
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
            function key(importedName, symbol, ambientModuleName, checker) {
                const moduleKey = ambientModuleName || "";
                return `${importedName}|${getSymbolId(skipAlias(symbol, checker))}|${moduleKey}`;
            }
            function parseKey(key2) {
                const symbolName2 = key2.substring(0, key2.indexOf("|"));
                const moduleKey = key2.substring(key2.lastIndexOf("|") + 1);
                const ambientModuleName = moduleKey === "" ? void 0 : moduleKey;
                return { symbolName: symbolName2, ambientModuleName };
            }
            function fileIsGlobalOnly(file) {
                return !file.commonJsModuleIndicator && !file.externalModuleIndicator && !file.moduleAugmentations && !file.ambientModuleNames;
            }
            function ambientModuleDeclarationsAreEqual(oldSourceFile, newSourceFile) {
                if (!arrayIsEqualTo(oldSourceFile.ambientModuleNames, newSourceFile.ambientModuleNames)) {
                    return false;
                }
                let oldFileStatementIndex = -1;
                let newFileStatementIndex = -1;
                for (const ambientModuleName of newSourceFile.ambientModuleNames) {
                    const isMatchingModuleDeclaration = (node) => isNonGlobalAmbientModule(node) && node.name.text === ambientModuleName;
                    oldFileStatementIndex = findIndex(oldSourceFile.statements, isMatchingModuleDeclaration, oldFileStatementIndex + 1);
                    newFileStatementIndex = findIndex(newSourceFile.statements, isMatchingModuleDeclaration, newFileStatementIndex + 1);
                    if (oldSourceFile.statements[oldFileStatementIndex] !== newSourceFile.statements[newFileStatementIndex]) {
                        return false;
                    }
                }
                return true;
            }
            function isNotShadowedByDeeperNodeModulesPackage(info, packageName) {
                if (!packageName || !info.moduleFileName)
                    return true;
                const typingsCacheLocation = host.getGlobalTypingsCacheLocation();
                if (typingsCacheLocation && startsWith(info.moduleFileName, typingsCacheLocation))
                    return true;
                const packageDeepestNodeModulesPath = packages.get(packageName);
                return !packageDeepestNodeModulesPath || startsWith(info.moduleFileName, packageDeepestNodeModulesPath);
            }
        }