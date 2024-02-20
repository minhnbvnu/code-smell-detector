async function uploadFolder(srcPath, dstPath, nasHttpTriggerPath, localNasTmpDir, noClobber) {
  console.log('zipping ' + srcPath);
  const zipFilePath = await zipWithArchiver(srcPath, localNasTmpDir);
  const zipFileSize = await getFileSize(zipFilePath);
  const fileOffSetCutByChunkSize = splitRangeBySize(0, zipFileSize, constants.FUN_NAS_CHUNK_SIZE);
  const zipHash = await getFileHash(zipFilePath);

  const fileName = path.basename(zipFilePath);

  const remoteNasTmpDir = path.posix.join(dstPath, '.fun_nas_tmp');
  debug(`checking NAS tmp dir ${remoteNasTmpDir}`);
  await checkRemoteNasTmpDir(nasHttpTriggerPath, remoteNasTmpDir);
  debug(`${green('✔')} check done`);
  const nasZipFile = path.posix.join(remoteNasTmpDir, fileName);
  debug(`Creating ${zipFileSize} bytes size file: ${nasZipFile}`);
  await createSizedNasFile(nasHttpTriggerPath, nasZipFile, zipFileSize);

  debug(`${green('✔')} create done`);

  await uploadFileByChunk(nasHttpTriggerPath, nasZipFile, zipFilePath, fileOffSetCutByChunkSize);

  debug(`checking uploaded NAS zip file ${nasZipFile} hash`);
  await checkFileHash(nasHttpTriggerPath, nasZipFile, zipHash);
  debug(`${green('✔')} hash unchanged`);

  console.log('unzipping file');
  const srcPathFiles = await readDirRecursive(srcPath);
  const unzipFilesCount = srcPathFiles.length;
  const filesArrSlicedBySize = chunk(srcPathFiles, constants.FUN_NAS_FILE_COUNT_PER_REQUEST);
  await unzipNasFileParallel(nasHttpTriggerPath, dstPath, nasZipFile, filesArrSlicedBySize, unzipFilesCount, noClobber);
  debug('cleaning');
  await sendCleanRequest(nasHttpTriggerPath, nasZipFile);
  debug(`${green('✔')} clean done`);

  rimraf.sync(zipFilePath);
  console.log(`${green('✔')} upload completed!`);
}