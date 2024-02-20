function getBuildInfoCacheEntry(state, buildInfoPath, resolvedConfigPath) {
            const path = toPath2(state, buildInfoPath);
            const existing = state.buildInfoCache.get(resolvedConfigPath);
            return (existing == null ? void 0 : existing.path) === path ? existing : void 0;
        }