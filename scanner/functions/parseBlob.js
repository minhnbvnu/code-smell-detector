function parseBlob(blob, options) {
    return convertBlobToBuffer(blob).then(buf => {
        return mm.parseBuffer(buf, blob.type, options);
    });
}