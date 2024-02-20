function generateBackupTplPath(tplPath) {
  const tplDir = path.dirname(tplPath);
  const tplName = path.basename(tplPath);
  const newTplName = `.${tplName}.backup`;
  return path.join(tplDir, newTplName);
}