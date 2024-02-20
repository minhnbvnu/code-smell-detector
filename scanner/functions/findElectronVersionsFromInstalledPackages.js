async function findElectronVersionsFromInstalledPackages(rootPath) {
  const packages = await arb(rootPath);
  return packages.children.filter((c) => c.name === 'electron').map((e) => minMatchingVersion(e.package.version));
}