function _fwrite(ptr, size, nitems, stream) {
    // size_t fwrite(const void *restrict ptr, size_t size, size_t nitems, FILE *restrict stream);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/fwrite.html
    var bytesToWrite = nitems * size;
    if (bytesToWrite == 0) return 0;
    var bytesWritten = _write(stream, ptr, bytesToWrite);
    if (bytesWritten == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return 0;
    } else {
        return Math.floor(bytesWritten / size);
    }
}