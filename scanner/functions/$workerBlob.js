function $workerBlob(workerUrl) {
    var script = "importScripts('" + net.qualifyURL(workerUrl) + "');";
    try {
        return new Blob([script], {"type": "application/javascript"});
    } catch (e) { // Backwards-compatibility
        var BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
        var blobBuilder = new BlobBuilder();
        blobBuilder.append(script);
        return blobBuilder.getBlob("application/javascript");
    }
}