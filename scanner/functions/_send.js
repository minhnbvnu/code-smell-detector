function _send(fd, buf, len, flags) {
    var sock = SOCKFS.getSocket(fd);
    if (!sock) {
        ___setErrNo(ERRNO_CODES.EBADF);
        return -1;
    }
    // TODO honor flags
    return _write(fd, buf, len);
}