function loaddir2(path) { return function (next) {
  posix.readdir(path)(function (filenames) {
    filter(filenames, function (filename, callback) {
      posix.stat(filename)(function (stat) {
        callback(stat.isFile());
      });
    })(function (filenames) {
      map(filenames, function (filename, callback) {
        posix.cat(filename)(function (data) {
          callback([filename, data]);
        });
      })(next);
    });
  });
}}