function _fputc(c, stream) {
    // int fputc(int c, FILE *stream);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputc.html
    var chr = unSign(c & 0xFF);
    HEAP8[((_fputc.ret) | 0)] = chr;
    var ret = _write(stream, _fputc.ret, 1);
    if (ret == -1) {
        var streamObj = FS.getStream(stream);
        if (streamObj) streamObj.error = true;
        return -1;
    } else {
        return chr;
    }
}