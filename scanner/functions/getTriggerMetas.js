async function getTriggerMetas(serviceName, functionName) {
  const fc = await getFcClient();
  const { data } = await fc.listTriggers(serviceName, functionName);
  return data.triggers;
}