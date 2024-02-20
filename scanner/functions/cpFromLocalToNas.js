async function cpFromLocalToNas({
  baseDir, tpl, tplPath, localPath,
  dstPath, localNasTmpDir, isSync,
  recursive, noClobber, noTargetDirectory
}) {
  const { nasPath, serviceName } = getNasPathAndServiceFromNasUri(dstPath, tpl);
  // fun nas init
  await deployNasService(baseDir, tpl, serviceName, tplPath);

  // 这里将 path.resolve(srcPath) 传进去, 是因为在 windows 平台上利用 git bash 输入的本地路径问题
  // git bash 读取 windows 本地路径是以 '/' 作为分隔符的, 因此在此处需要将其转换为以 '\'作为分隔符
  const resolvedSrc = resolveLocalPath(path.resolve(localPath));

  if (!await fs.pathExists(resolvedSrc)) {
    throw new Error(`${resolvedSrc} not exist`);
  }

  const srcPathIsDir = await isDir(resolvedSrc);
  const srcPathIsFile = await isFile(resolvedSrc);

  if (srcPathIsDir && !recursive) {
    throw new Error('Can not copy folder without option -r/--recursive');
  }

  const nasId = getNasId(tpl, serviceName);
  const nasHttpTriggerPath = getNasHttpTriggerPath(serviceName);

  debug(`checking dst path ${dstPath}...`);
  const statsRes = await statsRequest(nasPath, nasHttpTriggerPath);
  const stats = statsRes.data;

  const dstStats = {
    dstPath: dstPath,
    resolvedDst: nasPath,
    dstPathEndWithSlash: endWithSlash(nasPath),
    dstPathExists: stats.exists,
    parentDirOfDstPathExists: stats.parentDirExists,
    dstPathIsDir: stats.isDir,
    dstPathIsFile: stats.isFile
  };

  let actualDstPath = await checkCpDstPath(resolvedSrc, dstStats, recursive, noClobber, nasHttpTriggerPath, noTargetDirectory);

  if (isSync && srcPathIsDir) { actualDstPath = nasPath; }

  const permTip = checkWritePerm(stats, nasId, nasPath);
  if (permTip) {
    console.log(red(`Warning: ${permTip}`));
  }

  if (srcPathIsDir) {
    await uploadFolder(resolvedSrc, actualDstPath, nasHttpTriggerPath, localNasTmpDir, noClobber);
  } else if (srcPathIsFile) {
    await uploadFile(resolvedSrc, actualDstPath, nasHttpTriggerPath);
  } else {
    throw new Error(`${localPath} has the same file stat and folder stat`);
  }
}