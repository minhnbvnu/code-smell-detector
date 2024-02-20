function numFiles(dir, items, callback) {
  const total = items.length;
  let files = 0;
  let completed = 0;

  if (total === 0) {
    callback(null, 0);
  }
  items.forEach(function (item) {
    fs.stat(path.join(dir, item), function (err, stats) {
      if (err) {
        return callback(err);
      }
      if (stats && stats.isFile()) {
        ++files;
      }
      ++completed;
      if (completed === total) {
        callback(null, files);
      }
    });
  });
}