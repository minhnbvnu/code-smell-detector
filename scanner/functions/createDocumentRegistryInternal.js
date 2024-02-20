function createDocumentRegistryInternal(useCaseSensitiveFileNames, currentDirectory = "", externalCache) {
            const buckets = /* @__PURE__ */ new Map();
            const getCanonicalFileName = createGetCanonicalFileName(!!useCaseSensitiveFileNames);
            function reportStats() {
                const bucketInfoArray = arrayFrom(buckets.keys()).filter((name) => name && name.charAt(0) === "_").map((name) => {
                    const entries = buckets.get(name);
                    const sourceFiles = [];
                    entries.forEach((entry, name2) => {
                        if (isDocumentRegistryEntry(entry)) {
                            sourceFiles.push({
                                name: name2,
                                scriptKind: entry.sourceFile.scriptKind,
                                refCount: entry.languageServiceRefCount
                            });
                        }
                        else {
                            entry.forEach((value, scriptKind) => sourceFiles.push({ name: name2, scriptKind, refCount: value.languageServiceRefCount }));
                        }
                    });
                    sourceFiles.sort((x, y) => y.refCount - x.refCount);
                    return {
                        bucket: name,
                        sourceFiles
                    };
                });
                return JSON.stringify(bucketInfoArray, void 0, 2);
            }
            function getCompilationSettings(settingsOrHost) {
                if (typeof settingsOrHost.getCompilationSettings === "function") {
                    return settingsOrHost.getCompilationSettings();
                }
                return settingsOrHost;
            }
            function acquireDocument(fileName, compilationSettings, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
                return acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions);
            }
            function acquireDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                return acquireOrUpdateDocument(fileName, path, compilationSettings, key, scriptSnapshot, version2, 
                /*acquiring*/
                true, scriptKind, languageVersionOrOptions);
            }
            function updateDocument(fileName, compilationSettings, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                const key = getKeyForCompilationSettings(getCompilationSettings(compilationSettings));
                return updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions);
            }
            function updateDocumentWithKey(fileName, path, compilationSettings, key, scriptSnapshot, version2, scriptKind, languageVersionOrOptions) {
                return acquireOrUpdateDocument(fileName, path, getCompilationSettings(compilationSettings), key, scriptSnapshot, version2, 
                /*acquiring*/
                false, scriptKind, languageVersionOrOptions);
            }
            function getDocumentRegistryEntry(bucketEntry, scriptKind) {
                const entry = isDocumentRegistryEntry(bucketEntry) ? bucketEntry : bucketEntry.get(Debug.checkDefined(scriptKind, "If there are more than one scriptKind's for same document the scriptKind should be provided"));
                Debug.assert(scriptKind === void 0 || !entry || entry.sourceFile.scriptKind === scriptKind, `Script kind should match provided ScriptKind:${scriptKind} and sourceFile.scriptKind: ${entry == null ? void 0 : entry.sourceFile.scriptKind}, !entry: ${!entry}`);
                return entry;
            }
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
            function releaseDocument(fileName, compilationSettings, scriptKind, impliedNodeFormat) {
                const path = toPath(fileName, currentDirectory, getCanonicalFileName);
                const key = getKeyForCompilationSettings(compilationSettings);
                return releaseDocumentWithKey(path, key, scriptKind, impliedNodeFormat);
            }
            function releaseDocumentWithKey(path, key, scriptKind, impliedNodeFormat) {
                const bucket = Debug.checkDefined(buckets.get(getDocumentRegistryBucketKeyWithMode(key, impliedNodeFormat)));
                const bucketEntry = bucket.get(path);
                const entry = getDocumentRegistryEntry(bucketEntry, scriptKind);
                entry.languageServiceRefCount--;
                Debug.assert(entry.languageServiceRefCount >= 0);
                if (entry.languageServiceRefCount === 0) {
                    if (isDocumentRegistryEntry(bucketEntry)) {
                        bucket.delete(path);
                    }
                    else {
                        bucketEntry.delete(scriptKind);
                        if (bucketEntry.size === 1) {
                            bucket.set(path, firstDefinedIterator(bucketEntry.values(), identity));
                        }
                    }
                }
            }
            function getLanguageServiceRefCounts(path, scriptKind) {
                return arrayFrom(buckets.entries(), ([key, bucket]) => {
                    const bucketEntry = bucket.get(path);
                    const entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
                    return [key, entry && entry.languageServiceRefCount];
                });
            }
            return {
                acquireDocument,
                acquireDocumentWithKey,
                updateDocument,
                updateDocumentWithKey,
                releaseDocument,
                releaseDocumentWithKey,
                getLanguageServiceRefCounts,
                reportStats,
                getKeyForCompilationSettings
            };
        }