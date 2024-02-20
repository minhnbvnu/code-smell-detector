function loaddir4(path) {
  var promise = new process.Promise();
  Posix.readdir(path).addCallback(function (filenames) {
    var realfiles = [];
    var count = filenames.length;
    filenames.forEach(function (filename) {
      Posix.stat(filename).addCallback(function (stat) {
        if (stat.isFile()) {
          realfiles.push(filename);
        }
        count--;
        if (count <=0) {
          var results = [];
          realfiles.forEach(function (filename) {
            Posix.cat(filename).addCallback(function (data) {
              results.push([filename, data]);
              if (results.length === realfiles.length) {
                promise.emitSuccess(results);
              }
            });
          });
        }
      });
    });
  });
  return promise;
}