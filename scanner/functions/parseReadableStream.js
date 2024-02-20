function parseReadableStream(stream, contentType, options) {
    const ns = new Browser2NodeStream_1.Browser2NodeStream(stream);
    return exports.parseNodeStream(ns, contentType, options).then(res => {
        debug(`Completed parsing from stream 1bytesRead=${ns.bytesRead} / fileSize=${options && options.fileSize ? options.fileSize : '?'}`);
        return res;
    });
}