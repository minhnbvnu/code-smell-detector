async function sendCleanRequest(nasHttpTriggerPath, nasZipFile) {
  const urlPath = nasHttpTriggerPath + 'clean';
  const query = { nasZipFile };
  return await getRequest(urlPath, query);
}