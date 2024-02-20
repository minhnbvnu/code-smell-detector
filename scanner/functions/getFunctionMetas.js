async function getFunctionMetas(serviceName) {
  const fc = await getFcClient();
  const { data } = await fc.listFunctions(serviceName);
  return data.functions;
}