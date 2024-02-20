async function uploadNasService(ossClient, tplPath) {
  const zipCodePath = path.resolve(__dirname, '../utils/fun-nas-server/dist/fun-nas-server.zip');

  if (!await fs.pathExists(zipCodePath)) {
    throw new Error('could not find ../utils/fun-nas-server/dist/fun-nas-server.zip');
  }
  const stat = await fs.stat(zipCodePath);
  const objectName = await uploadToOss({ ossClient,
    zipPath: zipCodePath,
    srcPath: zipCodePath,
    compressedSize: stat.size,
    tplPath
  });
  return `oss://${ossClient.options.bucket}/${objectName}`;
}