function ensureFixedChunkSizePollingWatchFile() {
                return fixedChunkSizePollingWatchFile || (fixedChunkSizePollingWatchFile = createFixedChunkSizePollingWatchFile({ getModifiedTime: getModifiedTime3, setTimeout: setTimeout2 }));
            }