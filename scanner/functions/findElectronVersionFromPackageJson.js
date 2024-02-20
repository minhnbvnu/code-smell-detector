function findElectronVersionFromPackageJson(pjsonData) {
  const dependencies = Object.assign({}, pjsonData.devDependencies, pjsonData.dependencies);
  return minMatchingVersion(dependencies.electron);
}