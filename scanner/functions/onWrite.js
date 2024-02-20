function onWrite(writeErr) {
        if (writeErr) {
          cb(writeErr);
          return;
        }

        cb();
      }