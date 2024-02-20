function resolvingModuleSpecifiers(logPrefix, host, resolver, program, position, preferences, isForImportStatementCompletion, isValidTypeOnlyUseSite, cb) {
            var _a2, _b, _c;
            const start = timestamp();
            const needsFullResolution = isForImportStatementCompletion || moduleResolutionSupportsPackageJsonExportsAndImports(getEmitModuleResolutionKind(program.getCompilerOptions()));
            let skippedAny = false;
            let ambientCount = 0;
            let resolvedCount = 0;
            let resolvedFromCacheCount = 0;
            let cacheAttemptCount = 0;
            const result = cb({
                tryResolve,
                skippedAny: () => skippedAny,
                resolvedAny: () => resolvedCount > 0,
                resolvedBeyondLimit: () => resolvedCount > moduleSpecifierResolutionLimit
            });
            const hitRateMessage = cacheAttemptCount ? ` (${(resolvedFromCacheCount / cacheAttemptCount * 100).toFixed(1)}% hit rate)` : "";
            (_a2 = host.log) == null ? void 0 : _a2.call(host, `${logPrefix}: resolved ${resolvedCount} module specifiers, plus ${ambientCount} ambient and ${resolvedFromCacheCount} from cache${hitRateMessage}`);
            (_b = host.log) == null ? void 0 : _b.call(host, `${logPrefix}: response is ${skippedAny ? "incomplete" : "complete"}`);
            (_c = host.log) == null ? void 0 : _c.call(host, `${logPrefix}: ${timestamp() - start}`);
            return result;
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
        }