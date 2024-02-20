function readDirectory(rootDir, extensions, excludes, includes, depth) {
                const rootDirPath = toPath3(rootDir);
                const rootResult = tryReadDirectory2(rootDir, rootDirPath);
                let rootSymLinkResult;
                if (rootResult !== void 0) {
                    return matchFiles(rootDir, extensions, excludes, includes, useCaseSensitiveFileNames, currentDirectory, depth, getFileSystemEntries, realpath);
                }
                return host.readDirectory(rootDir, extensions, excludes, includes, depth);
                function getFileSystemEntries(dir) {
                    const path = toPath3(dir);
                    if (path === rootDirPath) {
                        return rootResult || getFileSystemEntriesFromHost(dir, path);
                    }
                    const result = tryReadDirectory2(dir, path);
                    return result !== void 0 ? result || getFileSystemEntriesFromHost(dir, path) : emptyFileSystemEntries;
                }
                function getFileSystemEntriesFromHost(dir, path) {
                    if (rootSymLinkResult && path === rootDirPath)
                        return rootSymLinkResult;
                    const result = {
                        files: map(host.readDirectory(dir, 
                        /*extensions*/
                        void 0, 
                        /*exclude*/
                        void 0, 
                        /*include*/
                        ["*.*"]), getBaseNameOfFileName) || emptyArray,
                        directories: host.getDirectories(dir) || emptyArray
                    };
                    if (path === rootDirPath)
                        rootSymLinkResult = result;
                    return result;
                }
            }