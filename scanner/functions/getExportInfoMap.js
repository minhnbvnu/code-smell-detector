function getExportInfoMap(importingFile, host, program, preferences, cancellationToken) {
            var _a2, _b, _c, _d, _e;
            const start = timestamp();
            (_a2 = host.getPackageJsonAutoImportProvider) == null ? void 0 : _a2.call(host);
            const cache = ((_b = host.getCachedExportInfoMap) == null ? void 0 : _b.call(host)) || createCacheableExportInfoMap({
                getCurrentProgram: () => program,
                getPackageJsonAutoImportProvider: () => {
                    var _a3;
                    return (_a3 = host.getPackageJsonAutoImportProvider) == null ? void 0 : _a3.call(host);
                },
                getGlobalTypingsCacheLocation: () => {
                    var _a3;
                    return (_a3 = host.getGlobalTypingsCacheLocation) == null ? void 0 : _a3.call(host);
                }
            });
            if (cache.isUsableByFile(importingFile.path)) {
                (_c = host.log) == null ? void 0 : _c.call(host, "getExportInfoMap: cache hit");
                return cache;
            }
            (_d = host.log) == null ? void 0 : _d.call(host, "getExportInfoMap: cache miss or empty; calculating new results");
            const compilerOptions = program.getCompilerOptions();
            let moduleCount = 0;
            try {
                forEachExternalModuleToImportFrom(program, host, preferences, 
                /*useAutoImportProvider*/
                true, (moduleSymbol, moduleFile, program2, isFromPackageJson) => {
                    if (++moduleCount % 100 === 0)
                        cancellationToken == null ? void 0 : cancellationToken.throwIfCancellationRequested();
                    const seenExports = /* @__PURE__ */ new Map();
                    const checker = program2.getTypeChecker();
                    const defaultInfo = getDefaultLikeExportInfo(moduleSymbol, checker, compilerOptions);
                    if (defaultInfo && isImportableSymbol(defaultInfo.symbol, checker)) {
                        cache.add(importingFile.path, defaultInfo.symbol, defaultInfo.exportKind === 1 /* Default */ ? "default" /* Default */ : "export=" /* ExportEquals */, moduleSymbol, moduleFile, defaultInfo.exportKind, isFromPackageJson, checker);
                    }
                    checker.forEachExportAndPropertyOfModule(moduleSymbol, (exported, key) => {
                        if (exported !== (defaultInfo == null ? void 0 : defaultInfo.symbol) && isImportableSymbol(exported, checker) && addToSeen(seenExports, key)) {
                            cache.add(importingFile.path, exported, key, moduleSymbol, moduleFile, 0 /* Named */, isFromPackageJson, checker);
                        }
                    });
                });
            }
            catch (err) {
                cache.clear();
                throw err;
            }
            (_e = host.log) == null ? void 0 : _e.call(host, `getExportInfoMap: done in ${timestamp() - start} ms`);
            return cache;
        }