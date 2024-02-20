function _fprintf(stream, format, varargs) {
    // int fprintf(FILE *restrict stream, const char *restrict format, ...);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/printf.html
    var result = __formatString(format, varargs);
    var stack = Runtime.stackSave();
    var ret = _fwrite(allocate(result, 'i8', ALLOC_STACK), 1, result.length, stream);
    Runtime.stackRestore(stack);
    return ret;
}