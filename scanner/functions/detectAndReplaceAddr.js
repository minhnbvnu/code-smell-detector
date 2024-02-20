async function detectAndReplaceAddr({
  codeDir,
  mainFileSuffix,
  mainFileRegex,
  addrProcessores
}) {
  const mainFile = await findMainFile(codeDir, mainFileSuffix, mainFileRegex);
  if (!mainFile) {
    return { mainFile: null };
  }

  await detectAndReplaceMainFileAddr(codeDir, mainFile, addrProcessores);

  return { mainFile };
}