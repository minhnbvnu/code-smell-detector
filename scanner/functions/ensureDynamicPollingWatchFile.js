function ensureDynamicPollingWatchFile() {
                return dynamicPollingWatchFile || (dynamicPollingWatchFile = createDynamicPriorityPollingWatchFile({ getModifiedTime: getModifiedTime3, setTimeout: setTimeout2 }));
            }