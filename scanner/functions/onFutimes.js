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