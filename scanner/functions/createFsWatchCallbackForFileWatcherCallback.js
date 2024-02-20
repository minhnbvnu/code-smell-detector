function createFsWatchCallbackForFileWatcherCallback(fileName, callback, getModifiedTime3) {
            return (eventName, _relativeFileName, modifiedTime) => {
                if (eventName === "rename") {
                    modifiedTime || (modifiedTime = getModifiedTime3(fileName) || missingFileModifiedTime);
                    callback(fileName, modifiedTime !== missingFileModifiedTime ? 0 /* Created */ : 2 /* Deleted */, modifiedTime);
                }
                else {
                    callback(fileName, 1 /* Changed */, modifiedTime);
                }
            };
        }