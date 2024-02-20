function getBuildInfo3(state, buildInfoPath, resolvedConfigPath, modifiedTime) {
            const path = toPath2(state, buildInfoPath);
            const existing = state.buildInfoCache.get(resolvedConfigPath);
            if (existing !== void 0 && existing.path === path) {
                return existing.buildInfo || void 0;
            }
            const value = state.readFileWithCache(buildInfoPath);
            const buildInfo = value ? getBuildInfo(buildInfoPath, value) : void 0;
            state.buildInfoCache.set(resolvedConfigPath, { path, buildInfo: buildInfo || false, modifiedTime: modifiedTime || missingFileModifiedTime });
            return buildInfo;
        }