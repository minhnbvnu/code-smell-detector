async function recordMtimes(filePaths, buildOps, recordedPath) {

  const fileMtimes = await filePaths.reduce(async (accPromise, cur) => {
    if (!await fs.pathExists(cur)) {
      throw new Error(`${cur} is not exsit`);
    }

    const collection = await accPromise;
    const lstat = await fs.lstat(cur);

    const modifiedTimeObj = collection.modifiedTimestamps || {};

    Object.assign(collection, {
      'modifiedTimestamps': Object.assign(modifiedTimeObj, {
        [cur]: lstat.mtime.getTime().toString()
      })
    });

    return collection;
  }, Promise.resolve({}));

  // save build options
  fileMtimes.buildOps = buildOps;

  await fs.outputFile(recordedPath, JSON.stringify(fileMtimes, null, 4));
}