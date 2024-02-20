function findElectronVersionsFromYarnLock(yarnLockData) {
  // Converts the yarn.lock into the same format as package-lock.json.
  const plockData = lockfile.parse(yarnLockData);
  return findElectronVersionsFromPackageLock(plockData);
}