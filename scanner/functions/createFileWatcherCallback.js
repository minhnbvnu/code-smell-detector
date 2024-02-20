function createFileWatcherCallback(callback) {
            return (_fileName, eventKind, modifiedTime) => callback(eventKind === 1 /* Changed */ ? "change" : "rename", "", modifiedTime);
        }