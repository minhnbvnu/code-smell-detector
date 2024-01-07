function resolveFilePath(relativePath, parentModule) {
  if (!relativePath) return;
  if (!(parentModule && parentModule.filename)) return;
  if (relativePath[0] !== '.' && !isAbsolute(relativePath)) return;

  const resolvedPath = path.resolve(
    path.dirname(parentModule.filename),
    relativePath
  );
  if (!isCorePath(resolvedPath)) return;

  let extension = path.extname(resolvedPath);
  if (extension) {
    if (
      cache.extensions[extension] &&
      cache.extensions[extension].has(resolvedPath)
    )
      return resolvedPath;
  } else {
    for (extension in cache.extensions) {
      const paths = cache.extensions[extension];
      const resolvedPathWithExtension = `${resolvedPath}${extension}`;
      if (paths.has(resolvedPathWithExtension)) {
        return resolvedPathWithExtension;
      }
    }
  }
}