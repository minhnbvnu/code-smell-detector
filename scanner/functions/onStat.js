function onStat(statErr, stat) {
    if (statErr) {
      return callback(statErr);
    }

    // Check if mode needs to be updated
    var modeDiff = getModeDiff(stat.mode, file.stat.mode);

    // Check if atime/mtime need to be updated
    var timesDiff = getTimesDiff(stat, file.stat);

    // Check if uid/gid need to be updated
    var ownerDiff = getOwnerDiff(stat, file.stat);

    // Set file.stat to the reflect current state on disk
    Object.assign(file.stat, stat);

    // Nothing to do
    if (!modeDiff && !timesDiff && !ownerDiff) {
      return callback();
    }

    // Check access, `futimes`, `fchmod` & `fchown` only work if we own
    // the file, or if we are effectively root (`fchown` only when root).
    if (!isOwner(stat)) {
      return callback();
    }

    if (modeDiff) {
      return mode();
    }
    if (timesDiff) {
      return times();
    }
    owner();

    function mode() {
      var mode = stat.mode ^ modeDiff;

      fs.fchmod(fd, mode, onFchmod);

      function onFchmod(fchmodErr) {
        if (!fchmodErr) {
          file.stat.mode = mode;
        }
        if (timesDiff) {
          return times(fchmodErr);
        }
        if (ownerDiff) {
          return owner(fchmodErr);
        }
        callback(fchmodErr);
      }
    }

    function times(propagatedErr) {
      fs.futimes(fd, timesDiff.atime, timesDiff.mtime, onFutimes);

      function onFutimes(futimesErr) {
        if (!futimesErr) {
          file.stat.atime = timesDiff.atime;
          file.stat.mtime = timesDiff.mtime;
        }
        // If a filesystem doesn't implement futimes, we don't callback with the error.
        // Instead we update the stats to match filesystem and clear the error.
        if (futimesErr && futimesErr.code === 'ENOSYS') {
          file.stat.atime = stat.atime;
          file.stat.mtime = stat.mtime;
          futimesErr = null;
        }
        if (ownerDiff) {
          return owner(propagatedErr || futimesErr);
        }
        callback(propagatedErr || futimesErr);
      }
    }

    function owner(propagatedErr) {
      fs.fchown(fd, ownerDiff.uid, ownerDiff.gid, onFchown);

      function onFchown(fchownErr) {
        if (!fchownErr) {
          file.stat.uid = ownerDiff.uid;
          file.stat.gid = ownerDiff.gid;
        }
        callback(propagatedErr || fchownErr);
      }
    }
  }