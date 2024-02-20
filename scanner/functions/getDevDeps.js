function getDevDeps(manifest) {
  if (manifest.devDependencies) {
    return new Set(Object.keys(manifest.devDependencies).map(key => `${key}@${manifest.devDependencies[key]}`));
  } else {
    return new Set();
  }
}