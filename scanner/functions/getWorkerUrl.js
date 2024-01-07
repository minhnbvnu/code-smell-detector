function getWorkerUrl() {
    if (!workerUrl) {
        // execute UntarScope function in the worker
        const code = '(' + UntarScope.toString() + ')(true)\n\n';

        // create blob URL for the code above to be used for the worker
        const blob = new Blob([code], { type: 'application/javascript' });

        workerUrl = URL.createObjectURL(blob);
    }
    return workerUrl;
}