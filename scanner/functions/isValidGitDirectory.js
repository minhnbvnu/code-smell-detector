async function isValidGitDirectory(directory) {
  // To decide whether a directory has a valid .git folder, we use
  // the heuristic adopted by the valid_repository_path() function defined in
  // node_modules/git-utils/deps/libgit2/src/repository.c.
  const commonDirFile = directory.getSubdirectory('commondir');
  let commonDir;
  if (await commonDirFile.exists()) {
    const commonDirPathBuff = await fs.readFile(commonDirFile.getPath());
    const commonDirPathString = commonDirPathBuff.toString().trim();
    commonDir = new Directory(directory.resolve(commonDirPathString));
    if (!(await commonDir.exists())) {
      return false;
    }
  } else {
    commonDir = directory;
  }
  return (
    (await directory.getFile('HEAD').exists()) &&
    (await commonDir.getSubdirectory('objects').exists()) &&
    commonDir.getSubdirectory('refs').exists()
  );
}