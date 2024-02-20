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