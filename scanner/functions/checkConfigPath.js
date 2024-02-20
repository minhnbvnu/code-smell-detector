function checkConfigPath(filepath = '') {
  const resolvedPath = path.resolve(filepath);

  if (!fs.existsSync(resolvedPath)) {
    logErrorAndExit('Provided config path does not exist');
  }

  if (!fs.statSync(resolvedPath).isFile()) {
    logErrorAndExit('Provided config path must point to a file');
  }

  return resolvedPath;
}