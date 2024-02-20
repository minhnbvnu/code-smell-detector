function getLatestChangedDtsTime(state, options, resolvedConfigPath) {
            if (!options.composite)
                return void 0;
            const entry = Debug.checkDefined(state.buildInfoCache.get(resolvedConfigPath));
            if (entry.latestChangedDtsTime !== void 0)
                return entry.latestChangedDtsTime || void 0;
            const latestChangedDtsTime = entry.buildInfo && entry.buildInfo.program && entry.buildInfo.program.latestChangedDtsFile ? state.host.getModifiedTime(getNormalizedAbsolutePath(entry.buildInfo.program.latestChangedDtsFile, getDirectoryPath(entry.path))) : void 0;
            entry.latestChangedDtsTime = latestChangedDtsTime || false;
            return latestChangedDtsTime;
        }