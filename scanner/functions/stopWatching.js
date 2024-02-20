function stopWatching(state) {
            clearMap(state.allWatchedConfigFiles, closeFileWatcher);
            clearMap(state.allWatchedExtendedConfigFiles, closeFileWatcherOf);
            clearMap(state.allWatchedWildcardDirectories, (watchedWildcardDirectories) => clearMap(watchedWildcardDirectories, closeFileWatcherOf));
            clearMap(state.allWatchedInputFiles, (watchedWildcardDirectories) => clearMap(watchedWildcardDirectories, closeFileWatcher));
            clearMap(state.allWatchedPackageJsonFiles, (watchedPacageJsonFiles) => clearMap(watchedPacageJsonFiles, closeFileWatcher));
        }