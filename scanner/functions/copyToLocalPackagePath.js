async function copyToLocalPackagePath({ tplPath, zipPath, objectName }) {
  const dstPath = path.resolve(path.dirname(tplPath), '.fun', 'package', objectName);
  if (await fs.pathExists(dstPath)) {
    return;
  }
  await fs.copy(zipPath, dstPath);
}