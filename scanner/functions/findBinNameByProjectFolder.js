async function findBinNameByProjectFolder(codeDir) {
  const name = path.basename(codeDir);
  const binName = path.join(codeDir, name);
  if (await fs.pathExists(binName)) { return name; }
  return null;
}