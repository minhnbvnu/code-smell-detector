async function uploadToOss({ ossClient, zipPath,
  count, compressedSize, srcPath, tplPath
}) {

  const objectName = await util.md5(zipPath);
  await copyToLocalPackagePath({ tplPath, zipPath, objectName });
  const exist = await checkZipCodeExist(ossClient, objectName);

  if (!exist) {
    await ossClient.put(objectName, fs.createReadStream(zipPath));

    const convertedSize = bytes(compressedSize, {
      unitSeparator: ' '
    });

    let log = '';
    if (count) {
      log = `\nA total of ` + yellow(`${count}`) + `${count === 1 ? ' file' : ' files'}` + ` files were compressed and the final size was` + yellow(` ${convertedSize}`);
    }

    console.log(green(`\n${srcPath} has been uploaded to OSS. objectName: ${objectName}.${log}`));
  } else {
    console.log(`\n${srcPath} has been uploaded to OSS, skiping.`);
  }
  return objectName;
}