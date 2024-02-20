function getLanguageServiceRefCounts(path, scriptKind) {
                return arrayFrom(buckets.entries(), ([key, bucket]) => {
                    const bucketEntry = bucket.get(path);
                    const entry = bucketEntry && getDocumentRegistryEntry(bucketEntry, scriptKind);
                    return [key, entry && entry.languageServiceRefCount];
                });
            }