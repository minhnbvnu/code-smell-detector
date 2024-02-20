function reflectLinkStat(path, file, callback) {
  // Set file.stat to the reflect current state on disk
  fs.lstat(path, onLstat);

  function onLstat(lstatErr, stat) {
    if (lstatErr) {
      return callback(lstatErr);
    }

    file.stat = stat;
    callback();
  }
}