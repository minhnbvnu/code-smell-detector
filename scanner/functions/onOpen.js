function onOpen(openErr, openedFd) {
        if (openErr) {
          cb(openErr);
          return;
        }

        fd = openedFd;
        cb();
      }