async function getFuncitonMeta(serviceName, functionName) {
  const fc = await getFcClient();
  const { data } = await fc.getFunction(serviceName, functionName);
  return data;
}