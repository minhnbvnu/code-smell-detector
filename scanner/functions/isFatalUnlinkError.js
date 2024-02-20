function isFatalUnlinkError(err) {
  if (!err || err.code === 'ENOENT') {
    return false;
  }

  return true;
}