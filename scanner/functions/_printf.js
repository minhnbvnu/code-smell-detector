function _printf(format, varargs) {
    // int printf(const char *restrict format, ...);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
    var stdout = HEAP32[((_stdout) >> 2)];
    return _fprintf(stdout, format, varargs);
}