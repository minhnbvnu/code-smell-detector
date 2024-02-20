function startWatching(state, buildOrder) {
            if (!state.watchAllProjectsPending)
                return;
            mark("SolutionBuilder::beforeWatcherCreation");
            state.watchAllProjectsPending = false;
            for (const resolved of getBuildOrderFromAnyBuildOrder(buildOrder)) {
                const resolvedPath = toResolvedConfigFilePath(state, resolved);
                const cfg = parseConfigFile(state, resolved, resolvedPath);
                watchConfigFile(state, resolved, resolvedPath, cfg);
                watchExtendedConfigFiles(state, resolvedPath, cfg);
                if (cfg) {
                    watchWildCardDirectories(state, resolved, resolvedPath, cfg);
                    watchInputFiles(state, resolved, resolvedPath, cfg);
                    watchPackageJsonFiles(state, resolved, resolvedPath, cfg);
                }
            }
            mark("SolutionBuilder::afterWatcherCreation");
            measure("SolutionBuilder::Watcher creation", "SolutionBuilder::beforeWatcherCreation", "SolutionBuilder::afterWatcherCreation");
        }