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