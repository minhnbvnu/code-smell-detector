function getOrCreateSourceFileByPath(fileName, path, languageVersionOrOptions, _onError, shouldCreateNewSourceFile) {
                    Debug.assert(compilerHost, "getOrCreateSourceFileByPath called after typical CompilerHost lifetime, check the callstack something with a reference to an old host.");
                    const scriptSnapshot = host.getScriptSnapshot(fileName);
                    if (!scriptSnapshot) {
                        return void 0;
                    }
                    const scriptKind = getScriptKind(fileName, host);
                    const scriptVersion = host.getScriptVersion(fileName);
                    if (!shouldCreateNewSourceFile) {
                        const oldSourceFile = program && program.getSourceFileByPath(path);
                        if (oldSourceFile) {
                            if (scriptKind === oldSourceFile.scriptKind) {
                                return documentRegistry.updateDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                            }
                            else {
                                documentRegistry.releaseDocumentWithKey(oldSourceFile.resolvedPath, documentRegistry.getKeyForCompilationSettings(program.getCompilerOptions()), oldSourceFile.scriptKind, oldSourceFile.impliedNodeFormat);
                            }
                        }
                    }
                    return documentRegistry.acquireDocumentWithKey(fileName, path, host, documentRegistryBucketKey, scriptSnapshot, scriptVersion, scriptKind, languageVersionOrOptions);
                }