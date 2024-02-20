function getCachedFileSystemEntriesForBaseDir(path) {
                const entries = getCachedFileSystemEntries(getDirectoryPath(path));
                if (!entries) {
                    return entries;
                }
                if (!entries.sortedAndCanonicalizedFiles) {
                    entries.sortedAndCanonicalizedFiles = entries.files.map(getCanonicalFileName).sort();
                    entries.sortedAndCanonicalizedDirectories = entries.directories.map(getCanonicalFileName).sort();
                }
                return entries;
            }