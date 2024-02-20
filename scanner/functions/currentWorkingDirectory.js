function currentWorkingDirectory() {
  projectName = process.cwd().split(path.sep).pop();
  return projectName;
}