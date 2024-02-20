function hasTSConfigChanged(tsconfigPath) {
        const stat = fs_1.default.statSync(tsconfigPath);
        const lastModifiedAt = stat.mtimeMs;
        const cachedLastModifiedAt = tsconfigLastModifiedTimestampCache.get(tsconfigPath);
        tsconfigLastModifiedTimestampCache.set(tsconfigPath, lastModifiedAt);
        if (cachedLastModifiedAt === undefined) {
            return false;
        }
        return Math.abs(cachedLastModifiedAt - lastModifiedAt) > Number.EPSILON;
    }