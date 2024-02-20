function loaddir1(path) { return function (next) {
  posix.readdir(path)(function (filenames) {
    var realfiles = [];
    var count = filenames.length;
    filenames.forEach(function (filename) {
      posix.stat(filename)(function (stat) {
        if (stat.isFile()) {
          realfiles.push(filename);
        }
        count--;
        if (count <=0) {
          var results = [];
          realfiles.forEach(function (filename) {
            posix.cat(filename)(function (data) {
              results.push([filename, data]);
              if (results.length === realfiles.length) {
                next(results);
              }
            });
          });
        }
      });
    });
  });
}}