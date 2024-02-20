function ___syscall_fcntl64(fd, cmd, varargs) {
          SYSCALLS.varargs = varargs;
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (cmd) {
              case 0: {
                var arg = SYSCALLS.get();
                if (arg < 0) {
                  return -28;
                }
                var newStream;
                newStream = FS.createStream(stream, arg);
                return newStream.fd;
              }
              case 1:
              case 2:
                return 0;
              case 3:
                return stream.flags;
              case 4: {
                var arg = SYSCALLS.get();
                stream.flags |= arg;
                return 0;
              }
              case 5: {
                var arg = SYSCALLS.get();
                var offset = 0;
                HEAP16[arg + offset >>> 1] = 2;
                return 0;
              }
              case 6:
              case 7:
                return 0;
              case 16:
              case 8:
                return -28;
              case 9:
                setErrNo(28);
                return -1;
              default: {
                return -28;
              }
            }
          } catch (e) {
            if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
              throw e;
            return -e.errno;
          }
        }