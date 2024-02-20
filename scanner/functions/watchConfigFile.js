function watchConfigFile(state, resolved, resolvedPath, parsed) {
            if (!state.watch || state.allWatchedConfigFiles.has(resolvedPath))
                return;
            state.allWatchedConfigFiles.set(resolvedPath, watchFile(state, resolved, () => invalidateProjectAndScheduleBuilds(state, resolvedPath, 2 /* Full */), 2e3 /* High */, parsed == null ? void 0 : parsed.watchOptions, WatchType.ConfigFile, resolved));
        }