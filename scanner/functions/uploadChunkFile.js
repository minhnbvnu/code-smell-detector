async function uploadChunkFile(nasHttpTriggerPath, nasFile, zipFilePath, offSet) {
  const urlPath = nasHttpTriggerPath + 'file/chunk/upload';
  const fileStart = offSet.start;
  const fileSize = offSet.size;
  const query = {
    nasFile,
    fileStart: fileStart.toString()
  };

  const body = await readFileChunk(zipFilePath, fileStart, fileSize);

  const headers = {};
  return await postRequest(urlPath, query, body, headers);
}