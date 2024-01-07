function registerWorkerSource() {
    if (!Browser.decodeImageInWorker) {
        return;
    }
    registerWorkerAdapter(imageFetchWorkerKey, function () { return workerSource; });
}