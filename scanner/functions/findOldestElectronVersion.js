async function findOldestElectronVersion(places) {
  let versions = [];

  if (places.pjsonData) {
    const pjsonVersion = findElectronVersionFromPackageJson(places.pjsonData);
    if (pjsonVersion) versions.push(pjsonVersion);
  }

  if (places.rootPath) {
    const installedVersions = await findElectronVersionsFromInstalledPackages(places.rootPath);
    if (installedVersions) versions.push(...installedVersions);
  }

  if (places.plockData) {
    const plockVersions = findElectronVersionsFromPackageLock(places.plockData);
    if (plockVersions) versions.push(...plockVersions);
  }

  if (places.yarnLockData) {
    const yarnLockVersions = findElectronVersionsFromYarnLock(places.yarnLockData);
    if (yarnLockVersions) versions.push(...yarnLockVersions);
  }

  return oldestVersion(versions);
}