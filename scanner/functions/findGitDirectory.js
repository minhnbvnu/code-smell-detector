async function findGitDirectory(directory) {
  // TODO: Fix node-pathwatcher/src/directory.coffee so the following methods
  // can return cached values rather than always returning new objects:
  // getParent(), getFile(), getSubdirectory().
  let gitDir = directory.getSubdirectory('.git');
  if (typeof gitDir.getPath === 'function') {
    const gitDirPath = await pathFromGitFile(gitDir.getPath());
    if (gitDirPath) {
      gitDir = new Directory(directory.resolve(gitDirPath));
    }
  }
  if (
    typeof gitDir.exists === 'function' &&
    (await gitDir.exists()) &&
    (await isValidGitDirectory(gitDir))
  ) {
    return gitDir;
  } else if (directory.isRoot()) {
    return null;
  } else {
    return findGitDirectory(directory.getParent());
  }
}