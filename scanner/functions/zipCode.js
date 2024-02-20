async function zipCode(srcPath, ignore, zipName = 'code.zip', prefix, zlibOptions = {}) {

  const { randomDir, zipPath} = await generateRandomZipPath(zipName);
  const { count, compressedSize } = await zip.packTo(srcPath, ignore, zipPath, prefix, zlibOptions);

  return {
    zipPath,
    randomDir,
    count,
    compressedSize
  };
}