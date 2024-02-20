function isValidUnixId(id) {
  if (typeof id !== 'number') {
    return false;
  }

  if (id < 0) {
    return false;
  }

  return true;
}