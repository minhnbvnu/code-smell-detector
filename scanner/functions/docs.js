function docs(path, configPath) {
  return isDirectory(path)
    ? docsDirectory(path, configPath)
    : docsFile(path, configPath);
}