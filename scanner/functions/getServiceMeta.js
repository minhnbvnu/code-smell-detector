async function getServiceMeta(serviceName) {
  const fc = await getFcClient();
  const { data } = await fc.getService(serviceName);
  return data;
}