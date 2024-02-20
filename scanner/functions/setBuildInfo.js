function setBuildInfo(state, buildInfo, resolvedConfigPath, options, resultFlags) {
            const buildInfoPath = getTsBuildInfoEmitOutputFilePath(options);
            const existing = getBuildInfoCacheEntry(state, buildInfoPath, resolvedConfigPath);
            const modifiedTime = getCurrentTime(state.host);
            if (existing) {
                existing.buildInfo = buildInfo;
                existing.modifiedTime = modifiedTime;
                if (!(resultFlags & 2 /* DeclarationOutputUnchanged */))
                    existing.latestChangedDtsTime = modifiedTime;
            }
            else {
                state.buildInfoCache.set(resolvedConfigPath, {
                    path: toPath2(state, buildInfoPath),
                    buildInfo,
                    modifiedTime,
                    latestChangedDtsTime: resultFlags & 2 /* DeclarationOutputUnchanged */ ? void 0 : modifiedTime
                });
            }
        }