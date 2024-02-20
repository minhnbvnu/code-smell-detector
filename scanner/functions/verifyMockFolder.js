async function verifyMockFolder(folderName, pubKeyName, pubKeys = []) {
  const mock = path.resolve(base, folderName);
  const { fileName: filename } = await readUpdateInfos(mock);
  const computedHash = await sha512sumPath(path.resolve(mock, filename));
  const hashFile = await fsReadFile(path.resolve(mock, `${filename}.sha512sum`), "ascii");
  const signature = await fsReadFile(path.resolve(mock, `${filename}.sha512sum.sig`));
  const pubKey = await fsReadFile(path.resolve(base, pubKeyName), "ascii");
  const updater = await createMockAppUpdater({
    filename,
    computedHash,
    hashFile,
    signature,
    pubKey,
    pubKeys,
  });
  await updater.verify();
}