function createWriteStream(path, options, flush) {
  if (typeof options === 'function') {
    flush = options;
    options = null;
  }

  options = options || {};
  flush = flush || noopFlush;

  var mode = options.mode || constants.DEFAULT_FILE_MODE;
  var flags = options.flags || 'w';

  var fd = null;

  return new Writable({
    mapWritable: function (data) {
      if (typeof data === 'string') {
        return Buffer.from(data);
      } else {
        return data;
      }
    },
    open: function (cb) {
      fs.open(path, flags, mode, onOpen);

      function onOpen(openErr, openedFd) {
        if (openErr) {
          cb(openErr);
          return;
        }

        fd = openedFd;
        cb();
      }
    },
    destroy: function (cb) {
      if (fd) {
        fs.close(fd, onClose);
      } else {
        onClose();
      }

      function onClose(closeErr) {
        fd = null;
        cb(closeErr);
      }
    },
    write: function (data, cb) {
      fs.write(fd, data, 0, data.length, null, onWrite);

      function onWrite(writeErr) {
        if (writeErr) {
          cb(writeErr);
          return;
        }

        cb();
      }
    },
    final: function (cb) {
      flush(fd, cb);
    },
  });
}