function findPackageJson(modulePath) {
  if (modulePath.split(path.sep).indexOf('node_modules') == -1) {
    return null;
  }
  return relativePath(process.cwd(),
      findPackageJsonPath(modulePath) + '/package.json');
}