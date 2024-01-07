function isAtomRepoPath(repoPath) {
  let packageJsonPath = path.join(repoPath, 'package.json');
  if (fs.statSyncNoException(packageJsonPath)) {
    try {
      let packageJson = CSON.readFileSync(packageJsonPath);
      return packageJson.name === 'atom';
    } catch (e) {
      return false;
    }
  }

  return false;
}