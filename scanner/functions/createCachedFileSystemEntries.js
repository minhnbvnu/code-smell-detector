function createCachedFileSystemEntries(rootDir, rootDirPath) {
                var _a2;
                if (!host.realpath || ensureTrailingDirectorySeparator(toPath3(host.realpath(rootDir))) === rootDirPath) {
                    const resultFromHost = {
                        files: map(host.readDirectory(rootDir, 
                        /*extensions*/
                        void 0, 
                        /*exclude*/
                        void 0, 
                        /*include*/
                        ["*.*"]), getBaseNameOfFileName) || [],
                        directories: host.getDirectories(rootDir) || []
                    };
                    cachedReadDirectoryResult.set(ensureTrailingDirectorySeparator(rootDirPath), resultFromHost);
                    return resultFromHost;
                }
                if ((_a2 = host.directoryExists) == null ? void 0 : _a2.call(host, rootDir)) {
                    cachedReadDirectoryResult.set(rootDirPath, false);
                    return false;
                }
                return void 0;
            }