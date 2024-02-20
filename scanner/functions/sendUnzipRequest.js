async function sendUnzipRequest(nasHttpTriggerPath, dstDir, nasZipFile, unzipFiles, noClobber) {
  let cmd;
  if (noClobber) {
    cmd = `unzip -q -n ${nasZipFile} -d ${dstDir}`;
  } else {
    cmd = `unzip -q -o ${nasZipFile} -d ${dstDir}`;
  }

  for (let unzipFile of unzipFiles) {
    cmd = cmd + ` '${unzipFile}'`;
  }

  return await sendCmdRequest(nasHttpTriggerPath, _.escapeRegExp(cmd));
}