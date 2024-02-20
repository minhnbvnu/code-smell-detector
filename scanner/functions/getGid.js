function getGid() {
  // force 0 on windows.
  return process.getgid ? process.getgid() : 0;
}