function watchPackageJsonFiles(state, resolved, resolvedPath, parsed) {
            if (!state.watch || !state.lastCachedPackageJsonLookups)
                return;
            mutateMap(getOrCreateValueMapFromConfigFileMap(state.allWatchedPackageJsonFiles, resolvedPath), new Map(state.lastCachedPackageJsonLookups.get(resolvedPath)), {
                createNewValue: (path, _input) => watchFile(state, path, () => invalidateProjectAndScheduleBuilds(state, resolvedPath, 0 /* None */), 2e3 /* High */, parsed == null ? void 0 : parsed.watchOptions, WatchType.PackageJson, resolved),
                onDeleteValue: closeFileWatcher
            });
        }