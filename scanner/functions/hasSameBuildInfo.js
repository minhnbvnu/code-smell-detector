function hasSameBuildInfo(state, buildInfoCacheEntry, resolvedRefPath) {
            const refBuildInfo = state.buildInfoCache.get(resolvedRefPath);
            return refBuildInfo.path === buildInfoCacheEntry.path;
        }