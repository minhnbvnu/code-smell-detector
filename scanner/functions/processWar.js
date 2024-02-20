async function processWar(absCodeUri, warfilePath) {

  const absWarfilePath = path.join(absCodeUri, warfilePath);

  if (!await fs.pathExists(absWarfilePath)) {
    throw new Error('jarfile not exist ' + absWarfilePath);
  }

  const tmpCodeDir = path.join(tmpDir, uuid.v4());
  await fs.ensureDir(tmpCodeDir);
  await zip.extractZipTo(absWarfilePath, tmpCodeDir);

  // must have target path in codeUri
  const idx = absWarfilePath.indexOf('target/');

  if (idx < 0) {
    throw new Error('could not found target directory');
  }

  const targetAbsPath = absWarfilePath.substring(0, idx + 'target/'.length);

  if (await fs.pathExists(targetAbsPath)) {
    console.log('repackage war file ', absWarfilePath);
    await repackPackage(tmpCodeDir,
      path.join('WEB-INF', 'lib'),
      absWarfilePath, targetAbsPath);
  } else {
    throw new Error('target path not exist ' + targetAbsPath);
  }
}