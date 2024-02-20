function watchExtendedConfigFiles(state, resolvedPath, parsed) {
            updateSharedExtendedConfigFileWatcher(resolvedPath, parsed == null ? void 0 : parsed.options, state.allWatchedExtendedConfigFiles, (extendedConfigFileName, extendedConfigFilePath) => watchFile(state, extendedConfigFileName, () => {
                var _a2;
                return (_a2 = state.allWatchedExtendedConfigFiles.get(extendedConfigFilePath)) == null ? void 0 : _a2.projects.forEach((projectConfigFilePath) => invalidateProjectAndScheduleBuilds(state, projectConfigFilePath, 2 /* Full */));
            }, 2e3 /* High */, parsed == null ? void 0 : parsed.watchOptions, WatchType.ExtendedConfigFile), (fileName) => toPath2(state, fileName));
        }