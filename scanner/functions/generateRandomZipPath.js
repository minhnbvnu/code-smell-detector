async function generateRandomZipPath(zipName = 'code.zip') {
  const randomDirName = uuid.v4();
  const randomDir = path.join(tempDir, randomDirName);

  await fs.ensureDir(randomDir);
  const zipPath = path.join(randomDir, zipName);

  return {
    zipPath,
    randomDir
  };
}