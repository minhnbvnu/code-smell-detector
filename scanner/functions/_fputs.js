function _fputs(s, stream) {
    // int fputs(const char *restrict s, FILE *restrict stream);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/fputs.html
    return _write(stream, s, _strlen(s));
}