function getUid() {
  if (process.platform !== 'win32' && process.getuid) {
    return process.getuid();
  }
  return null;
}