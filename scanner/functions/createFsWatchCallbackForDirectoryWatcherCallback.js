function createFsWatchCallbackForDirectoryWatcherCallback(directoryName, callback, options, useCaseSensitiveFileNames, getCurrentDirectory) {
            return (eventName, relativeFileName) => {
                if (eventName === "rename") {
                    const fileName = !relativeFileName ? directoryName : normalizePath(combinePaths(directoryName, relativeFileName));
                    if (!relativeFileName || !isIgnoredByWatchOptions(fileName, options, useCaseSensitiveFileNames, getCurrentDirectory)) {
                        callback(fileName);
                    }
                }
            };
        }