async function zipWithArchiver(srcPath, localNasTmpDir) {

  if (!await fs.pathExists(srcPath)) { throw new Error('folder not exist: ' + srcPath); }
  if (await isFile(srcPath)) { throw new Error('zipWithArchiver not support a file'); }

  const targetName = path.basename(srcPath);
  //以当前操作的 unix 时间戳作为临时目录名称
  const curTime = new Date().getTime().toString();
  const zipDstDir = path.join(localNasTmpDir, curTime);
  const zipDst = path.join(zipDstDir, `.fun-nas-generated-${targetName}.zip`);

  await fs.ensureDir(zipDstDir);
  await zip.packTo(srcPath, null, zipDst);

  return zipDst;
}