function loaddir3(path) { return function (next) {
  posix.readdir(path)(function (filenames) {
    filter_map(filenames, function (filename, callback) {
      posix.stat(filename)(function (stat) {
        if (stat.isFile()) {
          posix.cat(filename)(function (data) {
            callback([filename, data]);
          });
        } else {
          callback();
        }
      });
    })(next);
  });
}}