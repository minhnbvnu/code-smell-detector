function check_and_load(filename) { return function (callback, errback) {
  fs.stat(filename)(function (stat) {
    if (stat.isFile()) {
      loadFile(filename, callback, errback);
    } else {
      callback();
    }
  }, errback);
}}