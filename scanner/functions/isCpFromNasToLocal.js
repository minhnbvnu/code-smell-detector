function isCpFromNasToLocal(srcPath, targetPath) {
  return isNasProtocol(srcPath) && !isNasProtocol(targetPath);
}