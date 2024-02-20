function createDirectory(dirPath) {
                const path = toPath3(dirPath);
                const result = getCachedFileSystemEntriesForBaseDir(path);
                if (result) {
                    const baseName = getBaseNameOfFileName(dirPath);
                    const canonicalizedBaseName = getCanonicalFileName(baseName);
                    const canonicalizedDirectories = result.sortedAndCanonicalizedDirectories;
                    if (insertSorted(canonicalizedDirectories, canonicalizedBaseName, compareStringsCaseSensitive)) {
                        result.directories.push(baseName);
                    }
                }
                host.createDirectory(dirPath);
            }