function onLstat(lstatErr, stat) {
    if (lstatErr) {
      return callback(lstatErr);
    }

    file.stat = stat;
    callback();
  }