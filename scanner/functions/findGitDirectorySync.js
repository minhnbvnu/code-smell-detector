function findGitDirectorySync(directory) {
  // TODO: Fix node-pathwatcher/src/directory.coffee so the following methods
  // can return cached values rather than always returning new objects:
  // getParent(), getFile(), getSubdirectory().
  let gitDir = directory.getSubdirectory('.git');
  if (typeof gitDir.getPath === 'function') {
    const gitDirPath = pathFromGitFileSync(gitDir.getPath());
    if (gitDirPath) {
      gitDir = new Directory(directory.resolve(gitDirPath));
    }
  }
  if (
    typeof gitDir.existsSync === 'function' &&
    gitDir.existsSync() &&
    isValidGitDirectorySync(gitDir)
  ) {
    return gitDir;
  } else if (directory.isRoot()) {
    return null;
  } else {
    return findGitDirectorySync(directory.getParent());
  }
}