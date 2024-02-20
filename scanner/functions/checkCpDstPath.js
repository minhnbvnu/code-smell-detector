async function checkCpDstPath(srcPath, dstStats, recursive, noClobber, nasHttpTriggerPath, noTargetDirectory = false) {
  const { resolvedDst, dstPath, dstPathExists, parentDirOfDstPathExists, dstPathIsDir, dstPathIsFile, dstPathEndWithSlash } = dstStats;

  var errorInf;
  if (!recursive && dstPathExists) {

    if (dstPathIsFile && !dstPathEndWithSlash) {
      if (!noClobber) { return resolvedDst; }
      errorInf = `${dstPath} already exists.`;
    }

    if (dstPathIsFile && dstPathEndWithSlash) {
      errorInf = `${dstPath} : Not a directory`;
    }

    if (dstPathIsDir && isNasProtocol(dstPath)) {
      const newDstPath = path.posix.join(resolvedDst, path.basename(srcPath));
      const statsRes = await statsRequest(newDstPath, nasHttpTriggerPath);
      const stats = statsRes.data;
      const newDstStats = {
        dstPath: `${dstPath}/${path.basename(srcPath)}`,
        resolvedDst: newDstPath,
        dstPathEndWithSlash: false,
        dstPathExists: stats.exists,
        parentDirOfDstPathExists: stats.parentDirExists,
        dstPathIsDir: stats.isDir,
        dstPathIsFile: stats.isFile
      };

      return await checkCpDstPath(srcPath, newDstStats, recursive, noClobber, nasHttpTriggerPath);
    }

    if (dstPathIsDir && !isNasProtocol(dstPath)) {
      // TO DO: 目标路径是本地路径
      return path.join(resolvedDst, path.basename(srcPath));
    }
  } else if (!recursive && !dstPathExists) {
    if (dstPathEndWithSlash) { errorInf = `nas cp: cannot create regular file ${dstPath}: Not a directory`; }
    else if (parentDirOfDstPathExists) { return resolvedDst; }
    else { errorInf = `nas cp: cannot create regular file ${dstPath}: No such file or directory`; }

  } else if (recursive && dstPathExists) {
    if (dstPathIsDir && isNasProtocol(dstPath)) {
      if (noTargetDirectory) {
        return resolvedDst;
      }
      return path.posix.join(resolvedDst, path.basename(srcPath));
    }
    if (dstPathIsDir && !isNasProtocol(dstPath)) {
      return path.join(resolvedDst, path.basename(srcPath));
    }
    if (dstPathIsFile && dstPathEndWithSlash) {
      errorInf = `nas cp: failed to access ${dstPath}: Not a directory`;
    }
    if (dstPathIsFile && !dstPathEndWithSlash) {
      errorInf = `nas cp: cannot overwrite non-directory ${dstPath} with directory ${srcPath}`;
    }
  } else if (recursive && !dstPathExists) {
    if (parentDirOfDstPathExists) {
      return resolvedDst;
    }
    errorInf = `nas cp: cannot create directory ${dstPath}: No such file or directory`;
  }
  throw new Error(errorInf);
}