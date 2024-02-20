function getManifestFromDirectory(pathname) {
  let manifestPath = `${pathname}${path.sep}manifest.json`;
  let manifest = readJSONFile(manifestPath);
  return manifest;
}