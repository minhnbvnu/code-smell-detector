function ___syscall_openat(dirfd, path, flags, varargs) {
          SYSCALLS.varargs = varargs;
          try {
            path = SYSCALLS.getStr(path);
            path = SYSCALLS.calculateAt(dirfd, path);
            var mode = varargs ? SYSCALLS.get() : 0;
            return FS.open(path, flags, mode).fd;
          } catch (e) {
            if (typeof FS == "undefined" || !(e instanceof FS.ErrnoError))
              throw e;
            return -e.errno;
          }
        }