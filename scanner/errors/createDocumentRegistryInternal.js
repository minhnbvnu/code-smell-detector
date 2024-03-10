            function acquireDocument(fileName, compilationSettings, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
            function acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
            function updateDocument(fileName, compilationSettings, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
            function updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
            function acquireOrUpdateDocument(fileName, path, compilationSettingsOrHost, key, scriptSnapshot, version2, acquiring, scriptKind, languageVersionOrOptions) {
                var _a2, _b, _c, _d;
                scriptKind = ensureScriptKind(fileName, scriptKind);
                const compilationSettings = getCompilationSettings(compilationSettingsOrHost);
                const host = compilationSettingsOrHost === compilationSettings ? void 0 : compilationSettingsOrHost;
                const scriptTarget = scriptKind === 6 /* JSON */ ? 100 /* JSON */ : getEmitScriptTarget(compilationSettings);
                const sourceFileOptions = typeof languageVersionOrOptions === "object" ? languageVersionOrOptions : {
                    languageVersion: scriptTarget,
                    impliedNodeFormat: host && getImpliedNodeFormatForFile(path, (_d = (_c = (_b = (_a2 = host.getCompilerHost) == null ? void 0 : _a2.call(host)) == null ? void 0 : _b.getModuleResolutionCache) == null ? void 0 : _c.call(_b)) == null ? void 0 : _d.getPackageJsonInfoCache(), host, compilationSettings),
                    setExternalModuleIndicator: getSetExternalModuleIndicator(compilationSettings)
                };
                sourceFileOptions.languageVersion = scriptTarget;
                const oldBucketCount = buckets.size;
                const keyWithMode = getDocumentRegistryBucketKeyWithMode(key, sourceFileOptions.impliedNodeFormat);
                const bucket = getOrUpdate(buckets, keyWithMode, () => /* @__PURE__ */ new Map());
                if (tracing) {
                    if (buckets.size > oldBucketCount) {
                        tracing.instant(tracing.Phase.Session, "createdDocumentRegistryBucket", { configFilePath: compilationSettings.configFilePath, key: keyWithMode });
                    }
                    const otherBucketKey = !isDeclarationFileName(path) && forEachEntry(buckets, (bucket2, bucketKey) => bucketKey !== keyWithMode && bucket2.has(path) && bucketKey);
                    if (otherBucketKey) {
                        tracing.instant(tracing.Phase.Session, "documentRegistryBucketOverlap", { path, key1: otherBucketKey, key2: keyWithMode });
                    }
                }
                const bucketEntry = bucket.get(path);
                let entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
                if (!entry && externalCache) {
                    const sourceFile = externalCache.getDocument(keyWithMode, path);
                    if (sourceFile) {
                        Debug.assert(acquiring);
                        entry = {
                            sourceFile,
                            languageServiceRefCount: 0
                        };
                        setBucketEntry();
                    }
                }
                if (!entry) {
                    const sourceFile = createLanguageServiceSourceFile(fileName, scriptSnapshot, sourceFileOptions, version2, 
                    /*setNodeParents*/
                    false, scriptKind);
                    if (externalCache) {
                        externalCache.setDocument(keyWithMode, path, sourceFile);
                    }
                    entry = {
                        sourceFile,
                        languageServiceRefCount: 1
                    };
                    setBucketEntry();
                }
                else {
                    if (entry.sourceFile.version !== version2) {
                        entry.sourceFile = updateLanguageServiceSourceFile(entry.sourceFile, scriptSnapshot, version2, scriptSnapshot.getChangeRange(entry.sourceFile.scriptSnapshot));
                        if (externalCache) {
                            externalCache.setDocument(keyWithMode, path, entry.sourceFile);
                        }
                    }
                    if (acquiring) {
                        entry.languageServiceRefCount++;
                    }
                }
                Debug.assert(entry.languageServiceRefCount !== 0);
                return entry.sourceFile;
                function setBucketEntry() {
                    if (!bucketEntry) {
                        bucket.set(path, entry);
                    }
                    else if (isDocumentRegistryEntry(bucketEntry)) {
                        const scriptKindMap = /* @__PURE__ */ new Map();
                        scriptKindMap.set(bucketEntry.sourceFile.scriptKind, bucketEntry);
                        scriptKindMap.set(scriptKind, entry);
                        bucket.set(path, scriptKindMap);
                    }
                    else {
                        bucketEntry.set(scriptKind, entry);
                    }
                }
            }