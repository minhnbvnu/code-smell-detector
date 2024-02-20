function fetchFromUrl(audioTrackUrl, options) {
    return fetch(audioTrackUrl).then(response => {
        const contentType = response.headers.get('Content-Type');
        const headers = [];
        response.headers.forEach(header => {
            headers.push(header);
        });
        if (response.ok) {
            if (response.body) {
                return this.parseReadableStream(response.body, contentType, options).then(res => {
                    response.body.cancel();
                    return res;
                });
            }
            else {
                // Fall back on Blob
                return response.blob().then(blob => {
                    return this.parseBlob(blob, options);
                });
            }
        }
        else {
            throw new Error(`HTTP error status=${response.status}: ${response.statusText}`);
        }
    });
}