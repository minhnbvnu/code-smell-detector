function loadFolderCompatibility(
  modulePath,
  rootPath,
  rootMetadata,
  moduleCache
) {
  const fs = require('fs-plus');

  const metadataPath = path.join(modulePath, 'package.json');
  if (!fs.isFileSync(metadataPath)) return;

  const metadata = JSON.parse(fs.readFileSync(metadataPath));
  const dependencies = metadata.dependencies || {};

  for (let name in dependencies) {
    if (!semver.validRange(dependencies[name])) {
      delete dependencies[name];
    }
  }

  const onDirectory = childPath => path.basename(childPath) !== 'node_modules';

  const extensions = ['.js', '.coffee', '.json', '.node'];
  let paths = {};
  function onFile(childPath) {
    const needle = path.extname(childPath);
    if (extensions.includes(needle)) {
      const relativePath = path.relative(rootPath, path.dirname(childPath));
      paths[relativePath] = true;
    }
  }
  fs.traverseTreeSync(modulePath, onFile, onDirectory);

  paths = Object.keys(paths);
  if (paths.length > 0 && Object.keys(dependencies).length > 0) {
    moduleCache.folders.push({ paths, dependencies });
  }

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
    loadFolderCompatibility(childPath, rootPath, rootMetadata, moduleCache);
  }
}