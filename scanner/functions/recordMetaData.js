async function recordMetaData(baseDir, functions, tplPath, metaPath, buildOps) {

  const metaPaths = _.flatMap(functions, (func => {
    const { functionRes } = func;
    const codeUri = (functionRes.Properties || {}).CodeUri;

    const asbBaseDir = path.resolve(baseDir);

    let absCodeUri;

    if (!codeUri) {
      absCodeUri = asbBaseDir;
    } else {
      absCodeUri = path.resolve(baseDir, codeUri);
    }

    return metaFiles
      .map(metaFile => { return path.join(absCodeUri, metaFile); })
      .filter(metaFile => { return fs.pathExistsSync(metaFile); });
  }));

  await recordMtimes([...metaPaths, tplPath], buildOps, metaPath);
}