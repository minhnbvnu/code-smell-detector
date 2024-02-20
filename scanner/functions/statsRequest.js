async function statsRequest(dstPath, nasHttpTriggerPath) {
  const urlPath = nasHttpTriggerPath + 'stats';
  const query = { dstPath };
  return await getRequest(urlPath, query);
}