function checkFileReaderSyncSupport() {
        var worker = makeWorker(syncDetectionScript);
        if (worker) {
            worker.onmessage =function(e) {
                FileReaderSyncSupport = e.data;
            };
            worker.postMessage({});
        }
    }