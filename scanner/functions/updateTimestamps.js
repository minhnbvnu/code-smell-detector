async function updateTimestamps(tplPath, files) {
  const metaPath = getMetaPath(tplPath);
  if (!await fs.pathExists(metaPath)) { return; }

  const metaObj = await readJsonFromFile(metaPath);

  if (_.isEmpty(metaObj)) { return; }

  const modifiedTimeObj = metaObj.modifiedTimestamps || {};

  for (const file of files) {
    if (modifiedTimeObj[file]) {
      const lstat = fs.lstatSync(file);
      modifiedTimeObj[file] = lstat.mtime.getTime().toString();
    }
  }

  await fs.outputFile(metaPath, JSON.stringify(metaObj, null, 4));
}