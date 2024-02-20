function getOwnerDiff(fsStat, vinylStat) {
  if (!isValidUnixId(vinylStat.uid) && !isValidUnixId(vinylStat.gid)) {
    return;
  }

  if (
    (!isValidUnixId(fsStat.uid) && !isValidUnixId(vinylStat.uid)) ||
    (!isValidUnixId(fsStat.gid) && !isValidUnixId(vinylStat.gid))
  ) {
    return;
  }

  var uid = fsStat.uid; // Default to current uid.
  if (isValidUnixId(vinylStat.uid)) {
    uid = vinylStat.uid;
  }

  var gid = fsStat.gid; // Default to current gid.
  if (isValidUnixId(vinylStat.gid)) {
    gid = vinylStat.gid;
  }

  if (uid === fsStat.uid && gid === fsStat.gid) {
    return;
  }

  var ownerDiff = {
    uid: uid,
    gid: gid,
  };

  return ownerDiff;
}