function isFatalOverwriteError(err, flags) {
  if (!err) {
    return false;
  }

  if (err.code === 'EEXIST' && flags[1] === 'x') {
    // Handle scenario for file overwrite failures.
    return false;
  }

  // Otherwise, this is a fatal error
  return true;
}