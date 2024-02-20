function resolveLocalPath(localPath) {
  if (!localPath) { throw new Error(red('local path could not be empty')); }

  const rootDir = path.parse(process.cwd()).root;
  if (localPath.startsWith(rootDir)) {
    return localPath;
  } else if (localPath.startsWith('~')) {
    return localPath.replace(/~/, USER_HOME);
  }
  const currentDir = process.cwd();
  return path.join(currentDir, localPath);
}