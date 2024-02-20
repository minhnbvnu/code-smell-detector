function read_directories(paths, next) {
  var count = paths.length,
      data = {};
  paths.forEach(function (path) {
    read_directory(path, function (results) {
      data[path] = results;
      count--;
      if (count <= 0) {
        next(data);
      }
    });
  });
}