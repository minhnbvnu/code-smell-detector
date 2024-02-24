function ___syscall_ioctl(fd, op, varargs) {
          SYSCALLS.varargs = varargs;
          try {
            var stream = SYSCALLS.getStreamFromFD(fd);
            switch (op) {
              case 21509:
              case 21505: {
                if (!stream.tty)
                  return -59;
                return 0;
              }
              case 21510:
              case 21511:
              case 21512:
              case 21506:
              case 21507:
              case 21508: {
                if (!stream.tty)
                  return -59;
                return 0;
              }
              case 21519: {
                if (!stream.tty)
                  return -59;
                var argp = SYSCALLS.get();
                HEAP32[argp >>> 2] = 0;
                return 0;
              }
              case 21520: {
                if (!stream.tty)
                  return -59;
                return -28;
              }
              case 21531: {
                var argp = SYSCALLS.get();
                return FS.ioctl(stream, op, argp);
              }
              case 21523: {
                if (!stream.tty)
                  return -59;
                return 0;
              }
              case 21524: {
                if (!stream.tty)
                  return -59;
                return 0;
              }
              default:
                return -28;
            }
          } catch (e) {
            if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
              throw e;
            return -e.errno;
          }
        }