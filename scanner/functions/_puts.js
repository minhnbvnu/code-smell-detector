function _puts(s) {
    // int puts(const char *s);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/puts.html
    // NOTE: puts() always writes an extra newline.
    var stdout = HEAP32[((_stdout) >> 2)];
    var ret = _fputs(s, stdout);
    if (ret < 0) {
        return ret;
    } else {
        var newlineRet = _fputc(10, stdout);
        return (newlineRet < 0) ? -1 : ret + 1;
    }
}