function getManifestVersion(runtimePath) {
  return JSON.parse(fs.readFileSync(path.join(runtimePath, 'manifest.json')).toString()).version;
}