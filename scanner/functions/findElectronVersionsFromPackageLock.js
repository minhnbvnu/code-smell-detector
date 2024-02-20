function findElectronVersionsFromPackageLock(plockData) {
  if (!plockData.dependencies) return undefined;
  // TODO: This currently only consideres the top-level dependencies.
  return Object.entries(plockData.dependencies).filter(d => d[0] === 'electron').map(d => minMatchingVersion(d[1].version));
}