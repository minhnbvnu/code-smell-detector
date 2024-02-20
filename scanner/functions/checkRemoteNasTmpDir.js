async function checkRemoteNasTmpDir(nasHttpTriggerPath, remoteNasTmpDir) {
  const urlPath = nasHttpTriggerPath + 'tmp/check';
  const query = { remoteNasTmpDir };
  return await getRequest(urlPath, query);
}