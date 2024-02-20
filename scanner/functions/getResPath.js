function getResPath (modulePath, resName) {
  return path.join(modulePath, 'dist', '_', resName);
}