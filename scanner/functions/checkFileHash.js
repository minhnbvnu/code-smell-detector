async function checkFileHash(nasHttpTriggerPath, nasFile, fileHash) {
  const urlPath = nasHttpTriggerPath + 'file/check';
  const query = { nasFile, fileHash };
  return await getRequest(urlPath, query);
}