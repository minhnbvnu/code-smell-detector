function pollingWatchFile(fileName, callback, pollingInterval, options) {
                return createSingleWatcherPerName(pollingWatches, useCaseSensitiveFileNames, fileName, callback, (cb) => pollingWatchFileWorker(fileName, cb, pollingInterval, options));
            }