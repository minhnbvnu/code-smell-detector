function updateWatchingWildcardDirectories(existingWatchedForWildcards, wildcardDirectories, watchDirectory) {
            mutateMap(existingWatchedForWildcards, wildcardDirectories, {
                // Create new watch and recursive info
                createNewValue: createWildcardDirectoryWatcher,
                // Close existing watch thats not needed any more
                onDeleteValue: closeFileWatcherOf,
                // Close existing watch that doesnt match in the flags
                onExistingValue: updateWildcardDirectoryWatcher
            });
            function createWildcardDirectoryWatcher(directory, flags) {
                return {
                    watcher: watchDirectory(directory, flags),
                    flags
                };
            }
            function updateWildcardDirectoryWatcher(existingWatcher, flags, directory) {
                if (existingWatcher.flags === flags) {
                    return;
                }
                existingWatcher.watcher.close();
                existingWatchedForWildcards.set(directory, createWildcardDirectoryWatcher(directory, flags));
            }
        }