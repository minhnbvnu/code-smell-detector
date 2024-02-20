function reflectStat(path, file, callback) {
  // Set file.stat to the reflect current state on disk
  fs.stat(path, onStat);

  function onStat(statErr, stat) {
    if (statErr) {
      return callback(statErr);
    }

    file.stat = stat;
    callback();
  }
}