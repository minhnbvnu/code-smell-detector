function getDocumentRegistryBucketKeyWithMode(key, mode) {
            return mode ? `${key}|${mode}` : key;
        }