function filterOverridenGitignores(files) {
  const IGNORE_FILENAMES = ['.yarnignore', '.npmignore', '.gitignore'];
  const GITIGNORE_NAME = IGNORE_FILENAMES[2];
  return files.filter(file => IGNORE_FILENAMES.indexOf(file.basename) > -1).reduce((acc, file) => {
    if (file.basename !== GITIGNORE_NAME) {
      return [...acc, file];
    } else {
      //don't include .gitignore if .npmignore or .yarnignore are present
      const dir = path.dirname(file.absolute);
      const higherPriorityIgnoreFilePaths = [path.join(dir, IGNORE_FILENAMES[0]), path.join(dir, IGNORE_FILENAMES[1])];
      const hasHigherPriorityFiles = files.find(file => higherPriorityIgnoreFilePaths.indexOf(path.normalize(file.absolute)) > -1);
      if (!hasHigherPriorityFiles) {
        return [...acc, file];
      }
    }
    return acc;
  }, []);
}