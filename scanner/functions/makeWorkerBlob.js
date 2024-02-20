function makeWorkerBlob(data) {
        // See https://stackoverflow.com/questions/10343913/how-to-create-a-web-worker-from-a-string
        window.URL = window.URL || window.webkitURL;
        var blob;
        try {
            blob = new Blob([data], {type: 'application/javascript'});
        } catch (e) { // Backwards-compatibility
            window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder || window.MozBlobBuilder;
            blob = new BlobBuilder();
            blob.append(data);
            blob = blob.getBlob();
        }
        return URL.createObjectURL(blob);
    }