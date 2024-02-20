function isInaccessible(err) {
  if (!err) {
    return false;
  }

  if (err.code === 'EACCES') {
    return true;
  }

  return false;
}