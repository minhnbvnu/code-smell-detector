function resolvingModuleSpecifiers(logPrefix, host, resolver, program, position, preferences, isForImportStatementCompletion, isValidTypeOnlyUseSite, cb) {
            function tryResolve(exportInfo, isFromAmbientModule) {
                if (isFromAmbientModule) {
                    const result3 = resolver.getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite);
                    if (result3) {
                        ambientCount++;
                    }
                    return result3 || "failed";
                }
                const shouldResolveModuleSpecifier = needsFullResolution || preferences.allowIncompleteCompletions && resolvedCount < moduleSpecifierResolutionLimit;
                const shouldGetModuleSpecifierFromCache = !shouldResolveModuleSpecifier && preferences.allowIncompleteCompletions && cacheAttemptCount < moduleSpecifierResolutionCacheAttemptLimit;
                const result2 = shouldResolveModuleSpecifier || shouldGetModuleSpecifierFromCache ? resolver.getModuleSpecifierForBestExportInfo(exportInfo, position, isValidTypeOnlyUseSite, shouldGetModuleSpecifierFromCache) : void 0;
                if (!shouldResolveModuleSpecifier && !shouldGetModuleSpecifierFromCache || shouldGetModuleSpecifierFromCache && !result2) {
                    skippedAny = true;
                }
                resolvedCount += (result2 == null ? void 0 : result2.computedWithoutCacheCount) || 0;
                resolvedFromCacheCount += exportInfo.length - ((result2 == null ? void 0 : result2.computedWithoutCacheCount) || 0);
                if (shouldGetModuleSpecifierFromCache) {
                    cacheAttemptCount++;
                }
                return result2 || (needsFullResolution ? "failed" : "skipped");
            }