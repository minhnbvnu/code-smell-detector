async function backupTemplateFile(tplPath) {
  const baseDir = getBaseDir(tplPath);
  const originTplPath = path.resolve(baseDir, path.basename(tplPath));
  const newPath = generateBackupTplPath(originTplPath);
  await fs.copy(originTplPath, newPath);
  console.log(green(`\nFun automatically backups the original ${path.basename(tplPath)} file to ${newPath}`));
}