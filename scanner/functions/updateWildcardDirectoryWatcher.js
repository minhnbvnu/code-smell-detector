function updateWildcardDirectoryWatcher(existingWatcher, flags, directory) {
                if (existingWatcher.flags === flags) {
                    return;
                }
                existingWatcher.watcher.close();
                existingWatchedForWildcards.set(directory, createWildcardDirectoryWatcher(directory, flags));
            }