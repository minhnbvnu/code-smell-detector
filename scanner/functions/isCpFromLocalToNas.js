function isCpFromLocalToNas(srcPath, targetPath) {
  return !isNasProtocol(srcPath) && isNasProtocol(targetPath);
}