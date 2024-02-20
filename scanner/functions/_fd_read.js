function _fd_read(fd, iov, iovcnt, pnum) {
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            var num = doReadv(stream, iov, iovcnt);
            HEAPU32[pnum >>> 2] = num;
            return 0;
          } catch (e) {
            if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
              throw e;
            return e.errno;
          }
        }