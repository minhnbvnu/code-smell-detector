async function zipToOss(ossClient, srcPath, ignore, zipName = 'code.zip', prefix = '', tplPath, zlibOptions = {}) {
  const { randomDir, zipPath} = await generateRandomZipPath(zipName);

  const { count, compressedSize } = await zip.packTo(srcPath, ignore, zipPath, prefix, zlibOptions);
  if (count === 0) { return null; }

  const objectName = await util.md5(zipPath);
  await copyToLocalPackagePath({ tplPath, zipPath, objectName });
  const exist = await checkZipCodeExist(ossClient, objectName);

  if (!exist) {
    await ossClient.put(objectName, fs.createReadStream(zipPath));

    const convertedSize = bytes(compressedSize, {
      unitSeparator: ' '
    });

    console.log(green(`\n${srcPath} has been uploaded to OSS. objectName: ${objectName}. A total of ` + yellow(`${count}`) + `${count === 1 ? ' file' : ' files'}` + ` files were compressed and the final size was` + yellow(` ${convertedSize}`)));
  } else {
    console.log(`\n${srcPath} has been uploaded to OSS, skiping.`);
  }

  await fs.remove(randomDir);
  return objectName;
}