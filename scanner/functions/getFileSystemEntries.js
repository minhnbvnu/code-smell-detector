function getFileSystemEntries(dir) {
                    const path = toPath3(dir);
                    if (path === rootDirPath) {
                        return rootResult || getFileSystemEntriesFromHost(dir, path);
                    }
                    const result = tryReadDirectory2(dir, path);
                    return result !== void 0 ? result || getFileSystemEntriesFromHost(dir, path) : emptyFileSystemEntries;
                }