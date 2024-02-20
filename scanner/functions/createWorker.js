function createWorker(workerUrl) {
    if (typeof Worker == "undefined")
        return { postMessage: function() {}, terminate: function() {} };
    if (config.get("loadWorkerFromBlob")) {
        var blob = $workerBlob(workerUrl);
        var URL = window.URL || window.webkitURL;
        var blobURL = URL.createObjectURL(blob);
        return new Worker(blobURL);
    }
    return new Worker(workerUrl);
}