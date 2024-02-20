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