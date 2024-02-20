function clearWatchCaches() {
        knownWatchProgramMap.clear();
        fileWatchCallbackTrackingMap.clear();
        folderWatchCallbackTrackingMap.clear();
        parsedFilesSeenHash.clear();
        programFileListCache.clear();
        tsconfigLastModifiedTimestampCache.clear();
    }