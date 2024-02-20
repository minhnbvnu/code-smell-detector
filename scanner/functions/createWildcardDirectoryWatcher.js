function createWildcardDirectoryWatcher(directory, flags) {
                return {
                    watcher: watchDirectory(directory, flags),
                    flags
                };
            }