function loadExtensions(modulePath, rootPath, rootMetadata, moduleCache) {
  const fs = require('fs-plus');
  const extensions = ['.js', '.coffee', '.json', '.node'];
  const nodeModulesPath = path.join(rootPath, 'node_modules');

  function onFile(filePath) {
    filePath = path.relative(rootPath, filePath);
    const segments = filePath.split(path.sep);
    if (segments.includes('test')) return;
    if (segments.includes('tests')) return;
    if (segments.includes('spec')) return;
    if (segments.includes('specs')) return;
    if (
      segments.length > 1 &&
      !['exports', 'lib', 'node_modules', 'src', 'static', 'vendor'].includes(
        segments[0]
      )
    )
      return;

    const extension = path.extname(filePath);
    if (extensions.includes(extension)) {
      if (moduleCache.extensions[extension] == null) {
        moduleCache.extensions[extension] = [];
      }
      moduleCache.extensions[extension].push(filePath);
    }
  }

  function onDirectory(childPath) {
    // Don't include extensions from bundled packages
    // These are generated and stored in the package's own metadata cache
    if (rootMetadata.name === 'atom') {
      const parentPath = path.dirname(childPath);
      if (parentPath === nodeModulesPath) {
        const packageName = path.basename(childPath);
        if (
          rootMetadata.packageDependencies &&
          rootMetadata.packageDependencies.hasOwnProperty(packageName)
        )
          return false;
      }
    }

    return true;
  }

  fs.traverseTreeSync(rootPath, onFile, onDirectory);
}