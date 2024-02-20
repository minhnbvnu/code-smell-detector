function getTimesDiff(fsStat, vinylStat) {
  var mtime = date(vinylStat.mtime) || 0;
  if (!mtime) {
    return;
  }

  var atime = date(vinylStat.atime) || 0;
  if (+mtime === +fsStat.mtime && +atime === +fsStat.atime) {
    return;
  }

  if (!atime) {
    atime = date(fsStat.atime) || undefined;
  }

  var timesDiff = {
    mtime: vinylStat.mtime,
    atime: atime,
  };

  return timesDiff;
}