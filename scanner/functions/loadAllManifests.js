function loadAllManifests(files, pathname) {
  let manifestList = [];

  files.forEach(entry => {
    if (entry.isDirectory()) {
      const entryPath = `${pathname}${path.sep}${entry.name}`;
      let manifest = getManifestFromDirectory(entryPath);
      if (manifest) {
        manifest.pathname = entryPath;
        manifestList.push(manifest);
      }
    }
  });
  return manifestList.sort(compareManifests);
}