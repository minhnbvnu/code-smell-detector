async function findBinName(codeDir) {
  let binName = await findBinNameByGoMod(codeDir);

  if (!binName) {
    binName = await findBinNameByProjectFolder(codeDir);
  }
  
  if (!binName) {
    binName = await findBinNameByBinFolder(codeDir);
  }

  return binName;
}