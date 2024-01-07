function isValidGitDirectorySync(directory) {
  // To decide whether a directory has a valid .git folder, we use
  // the heuristic adopted by the valid_repository_path() function defined in
  // node_modules/git-utils/deps/libgit2/src/repository.c.
  const commonDirFile = directory.getSubdirectory('commondir');
  let commonDir;
  if (commonDirFile.existsSync()) {
    const commonDirPathBuff = fs.readFileSync(commonDirFile.getPath());
    const commonDirPathString = commonDirPathBuff.toString().trim();
    commonDir = new Directory(directory.resolve(commonDirPathString));
    if (!commonDir.existsSync()) {
      return false;
    }
  } else {
    commonDir = directory;
  }
  return (
    directory.getFile('HEAD').existsSync() &&
    commonDir.getSubdirectory('objects').existsSync() &&
    commonDir.getSubdirectory('refs').existsSync()
  );
}