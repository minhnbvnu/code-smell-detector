async function repackPackage(unzippedPath, libRelativePath, absJarfilePath, targetAbsPath) {
  const libTmpAbsPath = path.join(unzippedPath, libRelativePath);
  const targetLibAbsPath = path.join(targetAbsPath, 'lib');

  await fs.ensureDir(targetLibAbsPath);
  debug('copy lib from ', libTmpAbsPath, 'to', targetLibAbsPath);

  await fs.copy(libTmpAbsPath, targetLibAbsPath, {
    overwrite: true,
    recursive: false
  });
  await fs.remove(libTmpAbsPath);
  await fs.ensureDir(libTmpAbsPath);
  await zip.packTo(unzippedPath, null, absJarfilePath);
  await fs.remove(libTmpAbsPath);
}