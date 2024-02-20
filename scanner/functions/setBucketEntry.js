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