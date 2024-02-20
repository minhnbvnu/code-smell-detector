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