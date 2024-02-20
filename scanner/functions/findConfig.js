function findConfig(filepath = process.cwd()) {
  const resolvedPath = path.resolve(filepath, defaultFilename);

  if (fs.existsSync(resolvedPath) && fs.statSync(resolvedPath).isFile()) {
    return resolvedPath;
  }

  const { root, dir } = path.parse(resolvedPath);
  const isRootDirectory = dir === root;

  return isRootDirectory
    ? defaultPath
    : findConfig(path.dirname(dir));
}