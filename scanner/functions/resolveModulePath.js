function resolveModulePath(relativePath, parentModule) {
  if (!relativePath) return;
  if (!(parentModule && parentModule.filename)) return;

  if (!nativeModules) nativeModules = process.binding('natives');
  if (nativeModules.hasOwnProperty(relativePath)) return;
  if (relativePath[0] === '.') return;
  if (isAbsolute(relativePath)) return;

  const folderPath = path.dirname(parentModule.filename);

  const range =
    cache.folders[folderPath] && cache.folders[folderPath][relativePath];
  if (!range) {
    const builtinPath = cache.builtins[relativePath];
    if (builtinPath) {
      return builtinPath;
    } else {
      return;
    }
  }

  const candidates = cache.dependencies[relativePath];
  if (candidates == null) return;

  for (let version in candidates) {
    const resolvedPath = candidates[version];
    if (Module._cache[resolvedPath] || isCorePath(resolvedPath)) {
      if (satisfies(version, range)) return resolvedPath;
    }
  }
}