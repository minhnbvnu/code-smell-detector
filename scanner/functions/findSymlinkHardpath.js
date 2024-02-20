function findSymlinkHardpath(path, callback) {
  fs.readlink(path, onReadlink);

  function onReadlink(readlinkErr, resolvedPath) {
    if (readlinkErr) {
      return callback(readlinkErr);
    }

    fs.lstat(resolvedPath, onLstat);

    function onLstat(lstatErr, stat) {
      if (lstatErr) {
        return callback(lstatErr);
      }

      if (stat.isSymbolicLink()) {
        return findSymlinkHardpath(resolvedPath, callback);
      }

      callback(null, resolvedPath);
    }
  }
}