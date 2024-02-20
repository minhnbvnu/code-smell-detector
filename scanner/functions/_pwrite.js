function _pwrite(fildes, buf, nbyte, offset) {
    // ssize_t pwrite(int fildes, const void *buf, size_t nbyte, off_t offset);
    // http://pubs.opengroup.org/onlinepubs/000095399/functions/write.html
    var stream = FS.getStream(fildes);
    if (!stream) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
    }
    try {
        var slab = HEAP8;
        return FS.write(stream, slab, buf, nbyte, offset);
    } catch (e) {
        FS.handleFSError(e);
        return -1;
    }
}