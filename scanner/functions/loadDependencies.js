function loadDependencies(modulePath, rootPath, rootMetadata, moduleCache) {
  const fs = require('fs-plus');

  for (let childPath of fs.listSync(path.join(modulePath, 'node_modules'))) {
    if (path.basename(childPath) === '.bin') continue;
    if (
      rootPath === modulePath &&
      (rootMetadata.packageDependencies &&
        rootMetadata.packageDependencies.hasOwnProperty(
          path.basename(childPath)
        ))
    ) {
      continue;
    }

    const childMetadataPath = path.join(childPath, 'package.json');
    if (!fs.isFileSync(childMetadataPath)) continue;

    const childMetadata = JSON.parse(fs.readFileSync(childMetadataPath));
    if (childMetadata && childMetadata.version) {
      let mainPath;
      try {
        mainPath = require.resolve(childPath);
      } catch (error) {
        mainPath = null;
      }

      if (mainPath) {
        moduleCache.dependencies.push({
          name: childMetadata.name,
          version: childMetadata.version,
          path: path.relative(rootPath, mainPath)
        });
      }

      loadDependencies(childPath, rootPath, rootMetadata, moduleCache);
    }
  }
}