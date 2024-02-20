async function nasPathExsit(nasHttpTriggerPath, nasPath) {
  const urlPath = nasHttpTriggerPath + 'path/exsit';
  const query = { path: nasPath };
  return await getRequest(urlPath, query);
}