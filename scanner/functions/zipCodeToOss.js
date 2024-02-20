async function zipCodeToOss({ ossClient, codeUri, runtime, ignore, tplPath, nasConfig,
  serviceName, functionName,
  zipName = 'code.zip',
  prefix = '',
  useNas = false,
  isRosCodeUri = false,
  zlibOptions = {}
}) {

  let objectName;

  if (codeUri.endsWith('.zip') || codeUri.endsWith('.jar') || codeUri.endsWith('.war')) {
    const stat = await fs.stat(codeUri);

    objectName = await uploadToOss({ ossClient,
      zipPath: codeUri,
      compressedSize: stat.size,
      srcPath: codeUri,
      tplPath
    });
    return { objectName };
  }

  const { zipPath, randomDir, count, compressedSize } = await zipCode(codeUri, ignore, zipName, prefix, zlibOptions);

  if (count === 0) { return { isEmpty: true, objectName }; }

  const rs = await fc.nasAutoConfigurationIfNecessary({ stage: 'package', tplPath, compressedSize, useNas,
    nasConfig, runtime, codeUri,
    isRosCodeUri,
    nasServiceName: serviceName,
    nasFunctionName: functionName
  });

  if (!rs.stop) {
    objectName = await uploadToOss({ ossClient, zipPath,
      srcPath: codeUri,
      compressedSize, count, tplPath
    });
  }
  await fs.remove(randomDir);

  return {
    stop: rs.stop,
    objectName
  };
}